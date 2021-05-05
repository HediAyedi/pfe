import { Component, OnInit } from '@angular/core';
import {EmployeurServiceService} from '../../api/employeur-service.service';
import {Employeur} from '../../models/employeur';
import {MessageService, PrimeNGConfig} from 'primeng/api';
import {showRuleCrashWarning} from 'tslint/lib/error';
import { SecteurActivite } from 'src/app/models/secteur-activite';

@Component({
  selector: 'app-formsociete',
  templateUrl: './formsociete.component.html',
  styleUrls: ['./formsociete.component.css'],
  providers: [MessageService]

})
export class FormsocieteComponent implements OnInit {


  employeur: Employeur = new Employeur();
  message: any ;
  secteurs: SecteurActivite[]=[];
  secteur= new SecteurActivite();
  constructor(private employeurService: EmployeurServiceService,
              private messageService: MessageService,
              private primengConfig: PrimeNGConfig) {
                this.secteurs=JSON.parse(localStorage["secteursCache"] || "[]");
                console.log(this.secteurs);
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    

  }
  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Success', detail: this.message});
  }
  showWarn(err) {
    this.messageService.add({severity:'warn', summary: 'Warn', detail: this.message});
    if(err.error.errors.email){this.messageService.add({severity: 'warn', summary: 'Warn', detail: err.error.errors.email});}
    if(err.error.errors.mot_de_passe){this.messageService.add({severity: 'warn', summary: 'Warn', detail: err.error.errors.mot_de_passe});}
    if(err.error.errors.matricule){this.messageService.add({severity: 'warn', summary: 'Warn', detail: err.error.errors.matricule});}
    if(err.error.errors.site_web){this.messageService.add({severity: 'warn', summary: 'Warn', detail: err.error.errors.site_web});}
  }
  ajouter() {

    console.log('emplyeur:', this.employeur);
    this.employeur.secteur_id=this.secteur.id;
    this.employeurService.save(this.employeur).subscribe(res => {
        if (!res.succes) {
          this.message = 'Ajout effectué avec succés attends La vérification de votre compte ';
          this.employeurService.getAll();
          this.showSuccess();
          console.log(this.message);
        }
      }, err => {
        this.message = err.error.message;
        this.showWarn(err);
      }
    );
  }
}
