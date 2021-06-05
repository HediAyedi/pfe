import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CvService } from 'src/app/api/cv.service';
import { Candidat } from 'src/app/models/candidat';
import { Cv } from 'src/app/models/cv';

@Component({
  selector: 'app-home-candidat',
  templateUrl: './home-candidat.component.html',
  styleUrls: ['./home-candidat.component.css']
})
export class HomeCandidatComponent implements OnInit {

  candidat=new Candidat;
  clicked: boolean;
  constructor(
    private cvService: CvService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.candidat=JSON.parse(localStorage.getItem("candidat"))
    if(!this.candidat.cv){
      this.ajoutCV();
    }
    console.log(this.candidat)
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
  
}
