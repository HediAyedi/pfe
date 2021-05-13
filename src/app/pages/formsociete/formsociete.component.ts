import { Component, OnInit } from '@angular/core';
import {EmployeurServiceService} from '../../api/employeur-service.service';
import { SecteurActiviteService } from 'src/app/api/caching services/secteur-activite.service';
import {AdresseService} from '../../api/adresse.service';
import {Employeur} from '../../models/employeur';
import {Adresse} from '../../models/adresse';
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
  adresse: Adresse= new Adresse();
  secteur= new SecteurActivite();
  constructor(private employeurService: EmployeurServiceService,
              private secteurActiviteService: SecteurActiviteService,
              private adresseService: AdresseService,
              private messageService: MessageService,
              private primengConfig: PrimeNGConfig) {
                
                console.log(this.secteurs);
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.secteurs=JSON.parse(localStorage["secteursCache"] || "[]");
    

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
    if(err.error.errors.telephone){this.messageService.add({severity: 'warn', summary: 'Warn', detail: err.error.errors.telephone});}
    if(err.error.errors.secteur_id){this.messageService.add({severity: 'warn', summary: 'Warn', detail: err.error.errors.secteur_id});}
    if(err.error.errors.description_entreprise){this.messageService.add({severity: 'warn', summary: 'Warn', detail: err.error.errors.description_entreprise});}
  }
  ajouter() {

    console.log('EmployeuR:', this.employeur);
    this.employeur.secteur_id=this.secteur.id;
    this.adresse=this.employeur.adresse;
    console.log("ADRESSE: ",this.adresse);
    this.employeurService.save(this.employeur).subscribe(res => {
        if (res.employeur) {
          this.message = 'Ajout effectué avec succés attends La vérification de votre compte ';
          this.employeurService.getAllCache();
          this.showSuccess();

          // ajout adresse 
          this.adresse.employeur_id=res.employeur.id;
          this.adresseService.save(this.adresse).subscribe(res => {
            console.log(res)
          }, err => {
            this.message ="not affected";
            console.log(this.message);
          }
        );
        }
      }, err => {
        this.message = err.error.message;
        this.showWarn(err);
      }
    );
  }
}
