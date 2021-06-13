import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompetenceService } from 'src/app/api/caching services/competence.service';
import { DomaineService } from 'src/app/api/caching services/domaine.service';
import { LangueService } from 'src/app/api/caching services/langue.service';
import { TypeOffreService } from 'src/app/api/caching services/type-offre.service';
import { CvService } from 'src/app/api/cv.service';
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
  clicked: boolean;
  langues: any;
  competences: any;
  domaines: any;
  offre_types: any;
  tests:Test[];
  constructor(
    private cvService: CvService,
    private router: Router,
    private testService:  TestService,
    private langueService:  LangueService,
    private domaineService: DomaineService,
    private competenceService: CompetenceService,
    private type_offreService: TypeOffreService,
    ) { }

  ngOnInit(): void {
    this.candidat=JSON.parse(localStorage.getItem("candidat"))
    if(!this.candidat.cv){
      this.ajoutCV();
    }
    console.log(this.candidat);

    //Tableau des tests from cache
    this.tests = JSON.parse(localStorage.testCache || '[]');
    if (this.tests.length == 0) {
      this.findAllTests();
    }

    //Tableau des langues from cache
    this.langues = JSON.parse(localStorage.languesCache || '[]');
    if (this.langues.length == 0) {
      this.findLangues();
    }

    //Tableau des competences from cache
    this.competences = JSON.parse(localStorage.competencesCache || '[]');
    if (this.competences.length == 0) {
      this.findCompetences();
    }

    //Tableau des domaines from cache
    this.domaines = JSON.parse(localStorage.domainesCache || '[]');
    if (this.domaines.length == 0) {
      this.findDomaines();
    }

    //Tableau des types cvs from cache
    this.offre_types = JSON.parse(localStorage.type_offresCache || '[]');
    if (this.offre_types.length == 0) {
      this.findTypeOffres();
    }
       
  }

  ajoutCV(){
    var cv= new Cv();
    cv.candidat_id=this.candidat.id;
    this.cvService.save(cv).subscribe(data=>{
      
      this.router.navigate(['gestion-cv/personal',data.id]);
      this.candidat.cv=data;
      localStorage.setItem("candidat",JSON.stringify(this.candidat));
    },err=>{
      console.log(err);
    })
  }

    //Shows the test modal
    openTestDialog(id){
      this.clicked=true
      sessionStorage.setItem('test_id',id)
      var modal = document.getElementById('testModal');
      modal.style.display = 'block';
    }
  
    //hides the test modal
    cancel() {
      this.clicked=false;
      sessionStorage.removeItem('test_id');
      var modal = document.getElementById('testModal');
      modal.style.display = 'none';
    }
  
    //Get data for caching
    public findLangues() {
      this.langueService.getAll().subscribe((res) => {
        this.langues = res;
        localStorage.setItem('languesCache', JSON.stringify(res));
      });
    }
    public findDomaines() {
      this.domaineService.getAll().subscribe((res) => {
        this.domaines = res;
        localStorage.setItem('domainesCache', JSON.stringify(res));
      });
    }
    public findCompetences() {
      this.competenceService.getAll().subscribe((res) => {
        this.competences = res;
        localStorage.setItem('competencesCache', JSON.stringify(res));
      });
    }
    public findTypeOffres() {
      this.type_offreService.getAll().subscribe((res) => {
        this.offre_types = res;
        localStorage.setItem('type_offresCache', JSON.stringify(res));
      });
    }

    public findAllTests() {
      this.testService.getAll().subscribe(
        (data) => {
          this.tests = data;
          localStorage.setItem('testsCache', JSON.stringify(data));
        },
        (err) => {
          console.log(err);
        }
      );
    }
}
