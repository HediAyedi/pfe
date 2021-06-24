import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ExperienceService } from 'src/app/api/experience.service';
import { Location } from '@angular/common';
import { Experience } from 'src/app/models/experience';

@Component({
  selector: 'app-gestion-experience',
  templateUrl: './gestion-experience.component.html',
  styleUrls: ['./gestion-experience.component.css']
})
export class GestionExperienceComponent implements OnInit {
  cv_id: string;
  experience= new Experience();
  modif_experience= new Experience();
  experiences: Experience[]=[] ;
  date_fin_valid= false;
  term:string;
  selected=false;

  constructor(
    
    private experienceService: ExperienceService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.cv_id = this.route.snapshot.paramMap.get('cv_id');
    this.findExperienceById();
  }

  findExperienceById() {
    this.experienceService.getAllById(this.cv_id).subscribe(
      (res) => {
        this.experiences = res;
        console.log('Experiences :', this.experiences);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // Toggle adding experience form
  affichageAjoutForm(){
    this.selected=!this.selected
  }

  showSignUpDialog(){
    var modal = document.getElementById("signUp");
    modal.style.display = "block";
  }

  cancel(){
    var formModal = document.getElementById("form");
    formModal.style.display = "none";
    this.findExperienceById();
    this.modif_experience=new Experience();
  }

  ajouterExperience(){
    document.getElementById('add_loader').style.display = "none";
    document.getElementById('add').style.display = "block";
    this.experience.cv_id= +this.cv_id;
    this.experienceService.save(this.experience).subscribe(res=>{
      this.experiences.push(res);

      this.selected = false;
      this.experience=new Experience();
      document.getElementById('add_loader').style.display = "block";
      document.getElementById('add').style.display = "none";
      document.forms[0].reset();
      document.forms[1].reset();
    }, err=>{
      console.log(err);
      document.getElementById('add_loader').style.display = "block";
      document.getElementById('add').style.display = "none";
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
    
    document.getElementById('edit_loader').style.display = "block";
    document.getElementById('edit').style.display = "none";
    this.experienceService.update(this.modif_experience,this.modif_experience.id).subscribe(res=>{
      
      document.getElementById('edit_loader').style.display = "none";
      document.getElementById('edit').style.display = "block";
      this.cancel();

    }, err=>{
      console.log(err);
      document.getElementById('edit_loader').style.display = "none";
      document.getElementById('edit').style.display = "block";
    })
  }



  //Suppression experience
  supprimerExperience(id){
    this.experienceService.delete(id).subscribe(res=>{
      this.findExperienceById();
    }, err=>{
      this.findExperienceById();
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
