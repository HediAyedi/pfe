import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeurServiceService } from 'src/app/api/employeur-service.service';
import { Employeur } from 'src/app/models/employeur';

@Component({
  selector: 'app-login-employeur',
  templateUrl: './login-employeur.component.html',
  styleUrls: ['./login-employeur.component.css']
})
export class LoginEmployeurComponent implements OnInit {

  constructor(
    private employeurService: EmployeurServiceService,
    private router: Router
    ) { }

    employeur: Employeur = new Employeur();
    
  ngOnInit(): void {
  }

  logIn() {
    this.employeurService.logIn(this.employeur).subscribe(res => {
      if (res.employeur) {
        console.log(res.employeur);
        const CACHE_KEY= 'candidatsCache'; 
        localStorage.setItem("employeur",JSON.stringify(res.employeur));
        localStorage.setItem("token",res.token);
        if(this.router.url.includes("loginCandidat")){
          this.router.navigate(['/offres']);
        }
      }
    }
      );
  }
}
