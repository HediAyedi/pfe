import { Component, OnInit } from '@angular/core';
import { CandidatService } from 'src/app/api/candidat.service';
import { Candidat } from 'src/app/models/candidat';

@Component({
  selector: 'app-login-candidat',
  templateUrl: './login-candidat.component.html',
  styleUrls: ['./login-candidat.component.css']
})
export class LoginCandidatComponent implements OnInit {

  candidat: Candidat = new Candidat();

  constructor(
    private candidatService: CandidatService,

  ) { }

  ngOnInit(): void {
  }

  logIn() {
    this.candidatService.logIn(this.candidat).subscribe(res => {
      if (res.candidat) {
        console.log(res.candidat);
        localStorage.setItem("candidat",JSON.stringify(res.candidat));
        localStorage.setItem("token",res.token);
      }
    }
      );
  }

}
