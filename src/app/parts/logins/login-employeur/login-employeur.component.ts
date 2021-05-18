import { Component, OnInit } from '@angular/core';
import { EmployeurService } from 'src/app/api/employeur.service';
import { Employeur } from 'src/app/models/employeur';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MessageService , PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-login-employeur',
  templateUrl: './login-employeur.component.html',
  styleUrls: ['./login-employeur.component.css']
})
export class LoginEmployeurComponent implements OnInit {
  message: any;

  constructor(
    private employeurService: EmployeurService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    private router: Router,
    ) { }

    employeur: Employeur = new Employeur();
    
  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  showWarn(err) {
    this.messageService.add({
      severity: 'warn',
      summary: 'Warn',
      detail: err.error.message
    });
  }

  logIn() {
    this.employeurService.logIn(this.employeur).subscribe(res => {
      if (res.employeur) {
        console.log(res.employeur);
        localStorage.setItem("employeur",JSON.stringify(res.employeur));
        localStorage.setItem("token",res.token);
        // if(this.router.url.includes("loginCandidat")){
        //   this.router.navigate(['/offres']);
        // }
        this.router.navigate(['employeur/home']);

      }
    },
    (err) => {
      console.log(err);
      this.message= err.error.message;
    }
      );
  }
}
