import { Component, OnInit } from '@angular/core';
import { Candidat } from '../../models/candidat';
import { CandidatService } from '../../api/candidat.service';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-candidat',
  templateUrl: './form-candidat.component.html',
  styleUrls: ['./form-candidat.component.scss'],
})
export class FormCandidatComponent implements OnInit {
  candidat: Candidat = new Candidat();
  message: any;
  civilites = ['M', 'Mme', 'Mlle'];
  prenom_candidat: string;
  nom_candidat: string;

  constructor(
    private candidatService: CandidatService,
    private messageService: MessageService,
    private router: Router,
    private primengConfig: PrimeNGConfig
  ) {}

  ngOnInit(): void {
    if(this.router.url=="/SignUpCandidat"){
      this.toggle();
    }
    this.primengConfig.ripple = true;
  }

  //
  //      IMAGE UPLOAD
  //
  /* Variabe to store file data */
  

  /* File onchange event */
  

  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: this.message,
    });
  }

  showWarn(err) {
    this.messageService.add({
      severity: 'warn',
      summary: 'Warn',
      detail: this.message,
    });
    if (err.error.errors.email) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warn',
        detail: "Cet email est déja uilisé",
      });
    }
    if (err.error.errors.mot_de_passe) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warn',
        detail: err.error.errors.mot_de_passe,
      });
    }
    if (err.error.errors.civilite) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warn',
        detail: "La civilité est obligatoire",
      });
    }
  }

  toggle(){
    document.querySelector('.cont').classList.toggle('s--signup');
    document.forms[0].reset();
    document.forms[1].reset();
    this.candidat=new Candidat();
  }
  signUp() {
    this.candidat.nom= this.nom_candidat.concat(' ', this.prenom_candidat);
    document.getElementById('form').style.display="none";
    document.getElementById('loader').style.display="block";
    console.log('candidat:', this.candidat);
    this.candidatService.save(this.candidat).subscribe(
      (res) => {
        if (res.candidat) {
          this.message =
            'Ajout effectué avec succés attends La vérification de votre compte ';
          localStorage.setItem('candidat', JSON.stringify(res.candidat));
          localStorage.setItem('token', res.token);
          sessionStorage.setItem('connected',JSON.stringify(true));
          document.getElementById('form').style.display="block";
          document.getElementById('loader').style.display="none";

          this.showSuccess();
          this.router.navigate(['offres']);
        }
      },
      (err) => {
        this.message = err.error.message;
        this.showWarn(err);
        document.getElementById('form').style.display="block";
        document.getElementById('loader').style.display="none";
      }
    );
  }

  logIn() {
    
    document.getElementById('login_btn').style.display="none";
    document.getElementById('login_loader').style.display="block";

    this.candidatService.logIn(this.candidat).subscribe(res => {
      if (res.candidat) {
        console.log(res.candidat);
        localStorage.setItem("candidat",JSON.stringify(res.candidat));
        localStorage.setItem("token",res.token);
        sessionStorage.setItem('connected',JSON.stringify(true));
        this.router.navigate(['offres']);
            
        document.getElementById('login_btn').style.display="block";
        document.getElementById('login_loader').style.display="none";
      }
    }, err=>{
      console.log(err);

      document.getElementById('login_btn').style.display="block";
      document.getElementById('login_loader').style.display="none";
    }
      );
  }
}
