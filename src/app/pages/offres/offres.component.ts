import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig, SelectItem } from 'primeng/api';
import { OffreService } from '../../api/offres.service';
import { Offre } from '../../models/offre';
import { Langue } from 'src/app/models/Langue';
import { ActivatedRoute, Router } from '@angular/router';

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

  langues: Langue[];
  offres: Offre[] = [];
  searched_offres: Offre[] = [];

  offres_noms: string[];

  //Boolean value to minimize errors in the offre modal
  clicked = false;

  constructor(
    private primengConfig: PrimeNGConfig,
    private offreService: OffreService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    //In case you logged/signed as a candidate after being prompted to login from the offre modal
    if (JSON.parse(sessionStorage.getItem('connected'))) {
      var selectedOffre = JSON.parse(sessionStorage.getItem('offre'));
      if (selectedOffre) {
        this.showDialog(selectedOffre);
        sessionStorage.removeItem('connected');
      }
    }

    var employeur_id = this.route.snapshot.paramMap.get('employeur_id');
    if (employeur_id) {
      this.findAllByEmployeur(employeur_id);
    } else {
      this.offres = JSON.parse(localStorage.offresCache || '[]');
      this.searched_offres=this.offres;
      this.findAll();
    }

    this.langues = JSON.parse(localStorage.languesCache || '[]');
    this.primengConfig.ripple = true;
  }

  public findAll() {
    this.offreService.getAll().subscribe(
      (data) => {
        this.offres = data;
        this.searched_offres = this.offres;
        localStorage.setItem('offresCache', JSON.stringify(data));
      },
      (err) => {
        console.log(err);
      }
    );
  }

  public findAllByEmployeur(id) {
    this.offreService.getOffresByEmployeur(id).subscribe(
      (data) => {
        this.offres = data;
        this.searched_offres = this.offres;
        console.log('data Emplois :', this.offres);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  navigate(offre) {
    sessionStorage.setItem('offre', JSON.stringify(offre));
    this.router.navigate(['/offre', offre.id]);
  }

  searchByName() {
    var search = [];
    var index=0;
    this.searched_offres = this.offres;
    // Transforming the list's items to upper case
    this.offres_noms= this.offres_noms.map(name => name.toUpperCase());
    console.log("offres: ",this.offres_noms);
    this.offres_noms.forEach((element) => {
      //Checks if the offre name will be duplicated in the offre names list 
      if ((this.offres_noms.indexOf(element) != index) && (this.offres_noms.indexOf(element) != -1)) {
        this.offres_noms.splice(index, index+1);
      }
      index++;
      console.log("offres: ",this.offres_noms);
    });

    if(this.offres_noms.length >0){
      this.offres.forEach((offre) => {
        this.offres_noms.forEach((element) => {
          var lower_case_nom=offre.nom_emploi.toUpperCase();
          element=element.toUpperCase();

          //Check if nom offre existe
          if (lower_case_nom.indexOf(element) !== -1) {
            
            //Checks if the offre will be duplicated in the list 
            if (search.indexOf(offre) == -1) {
              search.push(offre);
            }
          }
        });
      });
      this.searched_offres = search;
    }
  }
  //Shows the modal
  showDialog(offre) {
    this.clicked = true;
    sessionStorage.setItem('offre', JSON.stringify(offre));
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
}
