import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompetenceService } from 'src/app/api/caching services/competence.service';
import { DomaineService } from 'src/app/api/caching services/domaine.service';
import { LangueService } from 'src/app/api/caching services/langue.service';
import { TypeOffreService } from 'src/app/api/caching services/type-offre.service';
import { CvService } from 'src/app/api/cv.service';
import { OffreService } from 'src/app/api/offres.service';
import { TestService } from 'src/app/api/test.service';
import { Candidat } from 'src/app/models/candidat';
import { Cv } from 'src/app/models/cv';
import { Test } from 'src/app/models/test';

@Component({
  selector: 'app-home-candidat',
  templateUrl: './home-candidat.component.html',
  styleUrls: ['./home-candidat.component.css']
})
export class HomeCandidatComponent implements OnInit {

  candidat=new Candidat;
  langues: any[];
  competences: any[];
  domaines: any[];
  offre_types: any[];
  clicked:boolean;
  offres: any[]=[];
  loaded: boolean;
  page: number;
  currentOffre: any;
  constructor(
    private langueService:  LangueService,
    private domaineService: DomaineService,
    private competenceService: CompetenceService,
    private type_offreService: TypeOffreService,
    private offreService: OffreService,
    ) { }

  ngOnInit(): void {

    this.candidat=JSON.parse(localStorage.getItem("candidat"));
    if(this.candidat.cv){
      this.competences= this.candidat.cv.competences;
      this.domaines = this.candidat.cv.domaines;
      this.offre_types= this.candidat.cv.emploi_types;
    }

    this.findAllOffres();

    //Tableau des langues from cache
    this.langues = JSON.parse(sessionStorage.languesCache || '[]');
    
      this.findLangues();

    //Tableau des competences from cache
    this.competences = JSON.parse(sessionStorage.competencesCache || '[]');
    
      this.findCompetences();

    //Tableau des domaines from cache
    this.domaines = JSON.parse(sessionStorage.domainesCache || '[]');
      this.findDomaines();

    //Tableau des types cvs from cache
    this.offre_types = JSON.parse(sessionStorage.type_offresCache || '[]');
      this.findTypeOffres();
       
  }

  public findAllOffres() {
    this.offreService.getAll().subscribe(
      (data) => {
        this.offres = data;
        this.loaded=true;
        this.search();
        this.offres =this.offres.sort(this.custom_sort);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  
  search() {
    
    if (this.offre_types.length > 0) {
      this.searchByType();
    }
    if (this.domaines.length > 0) {
      this.searchByDomaine();
    }

    if (this.competences.length > 0) {
      this.searchByCompetence();
    }
    
  }
  searchByType(){
    var search = [];
    //Search by offer type
      this.offre_types.forEach((selected_type) => {
        console.log('selected:', selected_type);

        // Gets string from the TypeOffre object 
        var selected_offre_type = selected_type.emploi_type;

        

        //Loop in the offer array
        this.offres.forEach((offre) => {
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
      this.offres=search;
  }
  searchByDomaine(){
    var search = [];
    //Search by offer type
      this.domaines.forEach((selected_domaine) => {
        
        // Gets string from the Domaine object 
        var domaine = selected_domaine.domaine;
        console.log('Domaine:', selected_domaine);
        

        //Loop in the offer array
        this.offres.forEach((offre) => {
          if (offre.domaine.indexOf(domaine) !== -1) {
            //Checks if the offre will be duplicated in the list
            if (search.indexOf(offre) == -1) {
              search.push(offre);
            }
          }
        });
      });
      this.offres=search;
  }
  searchByCompetence(){
    var search = [];
    
    //Search by offer type
      this.competences.forEach((competence) => {
        
        // Gets string from the Competence object and changes it to upper case
        var competence = competence.competence.toUpperCase();

        //Loop in the offer array
        this.offres.forEach((offre) => {

          // Gets exigence from the Offre object and changes it to upper case
          // To maximize the adaptability between the competence and the written exigences
          var exigence = offre.exigence_emploi.toUpperCase();

          var description = offre.description_emploi.toUpperCase();

          if ((exigence.indexOf(competence) !== -1) ||(description.indexOf(competence) !== -1)) {
            //Checks if the offre will be duplicated in the list
            if (search.indexOf(offre) == -1) {
              search.push(offre);
            }
          }
        });
      });
      this.offres=search;
  }

  //Sort offers by date 
  custom_sort(a, b) {
    return  new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
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
    //Get data for caching
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
