import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig, SelectItem } from 'primeng/api';
import { OffreService } from '../../api/offres.service';
import { Offre } from '../../models/offre';
import { Langue } from 'src/app/models/Langue';
import { ActivatedRoute, Router } from '@angular/router';
import { Competence } from 'src/app/models/competence';
import { Domaine } from 'src/app/models/domaine';
import { TypeOffre } from 'src/app/models/type-offre';
import { LangueService } from 'src/app/api/caching services/langue.service';
import { CompetenceService } from 'src/app/api/caching services/competence.service';
import { DomaineService } from 'src/app/api/caching services/domaine.service';
import { TypeOffreService } from 'src/app/api/caching services/type-offre.service';

@Component({
  selector: 'app-offres',
  templateUrl: './offres.component.html',
  styleUrls: ['./offres.component.css'],
})
export class OffresComponent implements OnInit {
  // First page number declaration
  page = 1;
  //Filter value
  term: string;
  loading=false;

  langues: Langue[];
  offres: Offre[] = [];
  searched_offres: Offre[] = [];


  currentOffre = new Offre();


  offres_noms: string[] = [];

  competences: Competence[] = [];
  selected_competences: Competence[] = [];

  domaines: Domaine[] = [];
  selected_domaines: Domaine[] = [];

  offre_types: TypeOffre[] = [];
  selected_types: TypeOffre[] = [];

  //Boolean value to minimize errors in the offre modal
  clicked = false;

  // Logged Candidat
  candidat: any;

  constructor(
    private langueService: LangueService,
    private domaineService: DomaineService,
    private competenceService: CompetenceService,
    private type_offreService: TypeOffreService,

    private primengConfig: PrimeNGConfig,
    private offreService: OffreService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.candidat=JSON.parse(localStorage.getItem('candidat'));

    var employeur_id = this.route.snapshot.paramMap.get('employeur_id');
    if (employeur_id) {
      this.findAllByEmployeur(employeur_id);
    } else {
      this.findAll();
    }


    //Tableau des langues from cache
    this.langues = JSON.parse(sessionStorage.languesCache || '[]');
    if (this.langues.length == 0) {
      this.findLangues();
    }
    console.log('Les langues:', this.langues);

    //Tableau des competences from cache
    this.competences = JSON.parse(sessionStorage.competencesCache || '[]');
    if (this.competences.length == 0) {
      this.findCompetences();
    }
    console.log('Les competences:', this.competences);

    //Tableau des domaines from cache
    this.domaines = JSON.parse(sessionStorage.domainesCache || '[]');
    if (this.domaines.length == 0) {
      this.findDomaines();
    }
    console.log('Les domaines:', this.domaines);

    //Tableau des types cvs from cache
    this.offre_types = JSON.parse(sessionStorage.type_offresCache || '[]');
    if (this.offre_types.length == 0) {
      this.findTypeOffres();
    }
    console.log('Les types:', this.offre_types);
    
    //In case you logged/signed as a candidate after being prompted to login from the offre modal
    if (JSON.parse(sessionStorage.getItem('connected'))) {
      var selectedOffre = JSON.parse(sessionStorage.getItem('offre'));
      if (selectedOffre) {
        this.showDialog(selectedOffre);
        sessionStorage.removeItem('connected');
      }
    }

    this.primengConfig.ripple = true;
  }

  

  public findAll() {
    this.loading=true;
    this.offreService.getAll().subscribe(
      data => {
        this.loading=false;
        this.offres = [];
        data.forEach(offre=>{
          if( offre.employeur.active && offre.employeur.verifie){
            this.offres.push(offre);
          }
        });
        
        

        //Array for searched data
        this.searched_offres = this.offres;

        //Sort offers by date
       // this.searched_offres =this.searched_offres.sort(this.custom_sort);
      },
      err => {
        this.loading=false;
        console.log(err);
      }
    );
  }

  //Sort offers by date 
  custom_sort(a, b) {
    return  new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  }

  public findAllByEmployeur(id) {
    
    this.loading=true;
    this.offreService.getOffresByEmployeur(id).subscribe(
      (data) => {
        this.loading=false;
        this.offres = data;
        this.searched_offres = this.offres;
        console.log('data Emplois :', this.offres);
      },
      (err) => {
        this.loading=false;
        console.log(err);
      }
    );
  }

  navigate(offre) {
    sessionStorage.setItem('offre', JSON.stringify(offre));
    this.router.navigate(['/offre', offre.id]);
  }

  search() {
    this.page = 1;
    this.searched_offres = this.offres;
    if (this.offres_noms.length > 0) {
      this.searchByName();
    }
    if (this.selected_types.length > 0) {
      this.searchByType();
    }
    if (this.selected_domaines.length > 0) {
      this.searchByDomaine();
    }

    if (this.selected_competences.length > 0) {
      this.searchByCompetence();
    }
    
  }

  searchByName(){
    var search = [];
    var index = 0;
    //Search by offer name

    // Transforming the list's items to upper case
    this.offres_noms = this.offres_noms.map((name) => name.toUpperCase());
    this.offres_noms.forEach((offre_nom) => {
      //Checks if the offre name will be duplicated in the offre names list
      if (
        this.offres_noms.indexOf(offre_nom) != index &&
        this.offres_noms.indexOf(offre_nom) != -1
      ) {
        this.offres_noms.splice(index, index + 1);
      }
      index++;
    });

    this.offres_noms.forEach((offre_nom) => {
      offre_nom = offre_nom.toUpperCase();

      this.searched_offres.forEach((offre) => {
        var upper_case_nom = offre.nom_emploi.toUpperCase();

        //Check if nom offre existe
        if (upper_case_nom.indexOf(offre_nom) !== -1) {
          //Checks if the offre will be duplicated in the list
          if (search.indexOf(offre) == -1) {
            search.push(offre);
          }
        }
      });
    });
    this.searched_offres=search;
  }
  
  searchByType(){
    var search = [];
    //Search by offer type
      this.selected_types.forEach((selected_type) => {
        console.log('selected:', selected_type);

        // Gets string from the TypeOffre object 
        var selected_offre_type = selected_type.emploi_type;

        

        //Loop in the offer array
        this.searched_offres.forEach((offre) => {
          var offre_types = [];
          //Loop in the offer type array
          offre.emploi_types.forEach((type) => {
            offre_types.push(type.emploi_type);
          });

          if (offre_types.indexOf(selected_offre_type) !== -1) {
            //Checks if the offre will be duplicated in the list
            if (search.indexOf(offre) == -1) {
              search.push(offre);
            }
          }
        });
      });
      console.log("Seaarch: ",search)
      this.searched_offres=search;
  }
  searchByDomaine(){
    var search = [];
    //Search by offer type
      this.selected_domaines.forEach((selected_domaine) => {
        
        // Gets string from the Domaine object 
        var domaine = selected_domaine.domaine;
        console.log('Domaine:', selected_domaine);
        

        //Loop in the offer array
        this.searched_offres.forEach((offre) => {
          if (offre.domaine.indexOf(domaine) !== -1) {
            //Checks if the offre will be duplicated in the list
            if (search.indexOf(offre) == -1) {
              search.push(offre);
            }
          }
        });
      });
      this.searched_offres=search;
  }
  searchByCompetence(){
    var search = [];
    // Transforming the list's items to upper case
    this.offres_noms = this.offres_noms.map((name) => name.toUpperCase());
    //Search by offer type
      this.selected_competences.forEach((selected_competence) => {
        
        // Gets string from the Competence object and changes it to upper case
        var competence = selected_competence.competence.toUpperCase();

        //Loop in the offer array
        this.searched_offres.forEach((offre) => {

          // Gets exigence from the Offre object and changes it to upper case
          // To maximize the adaptability between the competence and the written exigences
          var exigence = offre.exigence_emploi.toUpperCase();

          var description = offre.description_emploi.toUpperCase();

          if (exigence.indexOf(competence) !== -1) {
            //Checks if the offre will be duplicated in the list
            if (search.indexOf(offre) == -1) {
              search.push(offre);
            }
          }
        });
      });
      this.searched_offres=search;
  }

  
  //Shows the modal
  showDialog(offre) {
    this.currentOffre=offre;
    sessionStorage.setItem('offre', JSON.stringify(offre));
    this.clicked = true;
    var modal = document.getElementById('offreModal');
    modal.style.display = 'block';
  }

  //hides the modal
  cancel() {
    this.clicked = false;
    sessionStorage.removeItem('offre');
    var modal = document.getElementById('offreModal');
    modal.style.display = 'none';
  }

  //Get data for searching
  public findLangues() {
    this.langueService.getAll().subscribe((res) => {
      this.langues = res;
      sessionStorage.setItem('languesCache', JSON.stringify(res));
    });
  }
  public findDomaines() {
    this.domaineService.getAll().subscribe((res) => {
      this.domaines = res;
      sessionStorage.setItem('domainesCache', JSON.stringify(res));
    });
  }
  public findCompetences() {
    this.competenceService.getAll().subscribe((res) => {
      this.competences = res;
      sessionStorage.setItem('competencesCache', JSON.stringify(res));
    });
  }
  public findTypeOffres() {
    this.type_offreService.getAll().subscribe((res) => {
      this.offre_types = res;
      sessionStorage.setItem('type_offresCache', JSON.stringify(res));
    });
  }
}
