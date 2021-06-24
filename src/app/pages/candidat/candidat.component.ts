import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CvService } from 'src/app/api/cv.service';
import { OffreService } from 'src/app/api/offres.service';
import { TestService } from 'src/app/api/test.service';
import { Candidat } from 'src/app/models/candidat';
import { Cv } from 'src/app/models/cv';

@Component({
  selector: 'app-candidat',
  templateUrl: './candidat.component.html',
  styleUrls: ['./candidat.component.css']
})
export class CandidatComponent implements OnInit {


  clicked: boolean;
  candidat = new Candidat;
  selected_test:any;
  tests: any[];
  offres: any;
  displayed_candidat: Candidat;
  domaines: any;
  competences: any;
  constructor(

    private cvService: CvService,
    public router: Router,
    private testService: TestService,
    private offreService: OffreService,
  ) { }

  ngOnInit(): void {
    this.candidat = JSON.parse(localStorage.getItem("candidat"));
    console.log(this.candidat);

    //Tableau des tests from cache
    this.tests = JSON.parse(localStorage.testCache || '[]');
    this.findAllTests();
  }
  ajoutCV() {
    var cv = new Cv();
    cv.candidat_id = this.candidat.id;
    this.cvService.save(cv).subscribe(data => {

      this.router.navigate(['candidat/gestion-cv/personal', data.id]);
      this.candidat.cv = data;
      localStorage.setItem("candidat", JSON.stringify(this.candidat));
    }, err => {
      console.log(err);
    })
  }

  //Shows the test modal
  openTestDialog(selected_test) {
    this.clicked = true
    sessionStorage.setItem('test', JSON.stringify(selected_test))
    var modal = document.getElementById('testModal');
    modal.style.display = 'block';
  }

  //hides the test modal
  TestCancel() {
    this.clicked = false;
    sessionStorage.removeItem('test_id');
    var modal = document.getElementById('testModal');
    modal.style.display = 'none';
  }

    //Shows the candidat modal
    CandidatDialog() {
      this.displayed_candidat = this.candidat;
      
      var modal = document.getElementById('candidatModal');
      modal.style.display = 'block';
    }
  
    //Hides the candidat modal
    CandidatCancel() {
      this.displayed_candidat= null;
      var modal = document.getElementById('candidatModal');
      modal.style.display = 'none';
    }
  
  public findAllTests() {
    this.testService.getAll().subscribe(
      (data) => {
        this.tests = data;
        sessionStorage.setItem('testsCache', JSON.stringify(data));
      },
      (err) => {
        console.log(err);
      }
    );
  }
  public findAllOffres() {
    this.offreService.getAll().subscribe(
      (data) => {
        this.offres = data;
        this.offres =this.offres.sort(this.custom_sort);
        sessionStorage.setItem('offresCache', JSON.stringify(data));
      },
      (err) => {
        console.log(err);
      }
    );
  }
  
  //Sort offers by date 
  custom_sort(a, b) {
    return  new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  }

  
  //Getting only relevant offers to the candidat
  search() {
    
    
    if (this.domaines.length > 0) {
      this.searchByDomaine();
    }

    if (this.competences.length > 0) {
      this.searchByCompetence();
    }
    
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

  signOut(){
    localStorage.removeItem('candidat');
    localStorage.removeItem('token');
    this.router.navigate(['/offres']);
  }
}
