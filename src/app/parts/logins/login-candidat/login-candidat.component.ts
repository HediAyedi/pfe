import { Component, OnInit } from '@angular/core';
import { CandidatService } from 'src/app/api/candidat.service';
import { Candidat } from 'src/app/models/candidat';
import {Router} from '@angular/router';
import {PrimeNGConfig} from 'primeng/api';

@Component({
  selector: 'app-login-candidat',
  templateUrl: './login-candidat.component.html',
  styleUrls: ['./login-candidat.component.css']
})
export class LoginCandidatComponent implements OnInit {

  candidat: Candidat = new Candidat();

  constructor(
    private candidatService: CandidatService,
    private primengConfig: PrimeNGConfig,
    private router: Router,


  ) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;

  }

  logIn() {
    this.candidatService.logIn(this.candidat).subscribe(res => {
      if (res.candidat) {
        console.log(res.candidat);
        localStorage.setItem("candidat",JSON.stringify(res.candidat));
        localStorage.setItem("token",res.token);
        this.router.navigate(['offres']);
      }
    }
      );
  }

}
