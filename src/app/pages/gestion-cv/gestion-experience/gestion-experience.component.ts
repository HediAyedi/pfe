import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CvService } from 'src/app/api/cv.service';
import { ExperienceService } from 'src/app/api/experience.service';
import { Location } from '@angular/common';
import { Cv } from 'src/app/models/cv';
import { Experience } from 'src/app/models/experience';

@Component({
  selector: 'app-gestion-experience',
  templateUrl: './gestion-experience.component.html',
  styleUrls: ['./gestion-experience.component.css']
})
export class GestionExperienceComponent implements OnInit {
  cv_id: string;
  cv= new Cv();
  experience= new Experience();
  modif_experience= new Experience();
  experiences: Experience[]=[] ;
  date_fin_valid= false;
  term:string;
  p: number = 1;

  constructor(
    
    private cvService: CvService,
    private experienceService: ExperienceService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.cv_id = this.route.snapshot.paramMap.get('cv_id');
    this.findCv();
  }

  findCv() {
    this.cvService.get(this.cv_id).subscribe(
      (res) => {
        this.cv = res;
        console.log('CV :', this.cv);
        this.experiences= this.cv.experiences;
        console.log('Experiences :', this.experiences);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // Toggle adding experience form
  affichageAjoutForm(){
    this.experience.selected=!this.experience.selected
  }

  showSignUpDialog(){
    var modal = document.getElementById("signUp");
    modal.style.display = "block";
  }

  cancel(){
    var formModal = document.getElementById("form");
    formModal.style.display = "none";
    this.findCv();
    this.modif_experience=new Experience();
  }

  ajouterExperience(){
    this.experience.cv_id=this.cv.id;
    this.experienceService.save(this.experience).subscribe(res=>{
      this.experiences.push(res);
      this.experience=new Experience();
    }, err=>{
      console.log(err)
    })
  }

  // DIALOG FOR MODIFYING EXPERIENCES
  modifDialog(expr){
    this.modif_experience=expr
    var formModal = document.getElementById("form");
    formModal.style.display = "block";
    console.log(this.modif_experience);
  }

//
  checkTyping(){
    if(this.modif_experience.date_fin > this.modif_experience.date_debut ){
      this.date_fin_valid=true
    }
  }


  modifierExperience(){
    this.experienceService.update(this.modif_experience,this.modif_experience.id).subscribe(res=>{
      this.cancel();
    }, err=>{
      console.log(err)
    })
  }



  //Suppression experience
  supprimerExperience(id){
    this.experienceService.delete(id).subscribe(res=>{
      this.findCv();
    }, err=>{
      this.findCv();
      console.log(err)
    })
  }


// Renders the date_fin value null when clicking the checkbbox
  nullifyDateFin(){
    if(this.experience.en_cours){
      this.experience.date_fin=null;
    }
  }

  // Renders the date_fin value null when clicking the checkbbox
  nullifyDateFinModif(){
    if(this.modif_experience.en_cours){
      this.modif_experience.date_fin=null;
    }
  }
  
// Nullifies the date_fin if it is older than the date_debut
  checkDate(){
    if (this.experience.date_debut>this.experience.date_fin){
      this.experience.date_fin=null;
    }
  }

// Goes to previous page 
  previousPage(){
    this.location.back();
  }

   confirm(){
    this.router.navigate(['candidat/home']);
   }
}
