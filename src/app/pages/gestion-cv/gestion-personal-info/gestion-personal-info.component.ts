import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidatService } from 'src/app/api/candidat.service';
import { Candidat } from 'src/app/models/candidat';
import { Location } from '@angular/common';

@Component({
  selector: 'app-gestion-personal-info',
  templateUrl: './gestion-personal-info.component.html',
  styleUrls: ['./gestion-personal-info.component.css'],
})
export class GestionPersonalInfoComponent implements OnInit {
  
  cv_id: string;
  candidat = new Candidat();
  submitted: boolean = false;
  civilites = ['M', 'Mme', 'Mlle'];


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private candidatservice: CandidatService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.candidat = JSON.parse(localStorage.getItem('candidat'));
    this.cv_id=this.route.snapshot.paramMap.get('cv_id');
  }

  nextPage() {
    console.log(this.cv_id);
      this.candidatservice.update(this.candidat, this.candidat.id).subscribe(res=>{
        this.router.navigate(['gestion-cv/professional',this.cv_id]);
        localStorage.setItem("candidat",JSON.stringify(this.candidat));
      });

    this.submitted = true;
  }
  previousPage(){
    this.location.back()
  }
}
