import { Component, OnInit } from '@angular/core';
import {MessageService, PrimeNGConfig} from 'primeng/api';
import {EmployeurService} from '../../../api/employeur.service';
import {SecteurActiviteService} from '../../../api/caching services/secteur-activite.service';
import {AdresseService} from '../../../api/adresse.service';
import {Employeur} from '../../../models/employeur';
import {SecteurActivite} from '../../../models/secteur-activite';
import {Adresse} from '../../../models/adresse';

@Component({
  selector: 'app-profile-employeur',
  templateUrl: './profile-employeur.component.html',
  styleUrls: ['./profile-employeur.component.css'],
  providers: [MessageService]

})
export class ProfileEmployeurComponent implements OnInit {
  message: any ;
  employeur: Employeur = new Employeur();
  secteurs: SecteurActivite[] = [];
  adresse: Adresse = new Adresse();
  secteur = new SecteurActivite();
  constructor(private employeurService: EmployeurService,
              private secteurActiviteService: SecteurActiviteService,
              private adresseService: AdresseService,
              private messageService: MessageService,
              private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.secteurs = JSON.parse(localStorage.secteursCache || '[]');
    this.employeur = JSON.parse( localStorage.getItem('employeur'));
    console.log(this.employeur);
  }

  showSuccess() {
    this.messageService.add({severity: 'success', summary: 'Success', detail: this.message});
  }
  showWarn(err) {
    this.messageService.add({severity: 'warn', summary: 'Warn', detail: this.message});
    if (err.error.errors.email){this.messageService.add({severity: 'warn', summary: 'Warn', detail: err.error.errors.email}); }
    if (err.error.errors.mot_de_passe){this.messageService.add({severity: 'warn', summary: 'Warn', detail: err.error.errors.mot_de_passe}); }
    if (err.error.errors.matricule){this.messageService.add({severity: 'warn', summary: 'Warn', detail: err.error.errors.matricule}); }
    if (err.error.errors.site_web){this.messageService.add({severity: 'warn', summary: 'Warn', detail: err.error.errors.site_web}); }
  }
  // ajouter() {
  //
  //   console.log('EmployeuR:', this.employeur);
  //   this.employeur.secteur_id=this.secteur.id;
  //   this.adresse=this.employeur.adresse;
  //   console.log("ADRESSE: ",this.adresse);
  //   this.employeurService.save(this.employeur).subscribe(res => {
  //       if (res.employeur) {
  //         this.message = 'Ajout effectué avec succés attends La vérification de votre compte ';
  //         this.employeurService.getAllCache();
  //         this.showSuccess();
  //
  //         // ajout adresse
  //         this.adresse.employeur_id=res.employeur.id;
  //         this.adresseService.save(this.adresse).subscribe(res => {
  //             console.log(res)
  //             if (res.adresse) {
  //               this.message = 'Ajout effectué avec succés attends La vérification de votre compte ';
  //               this.showSuccess();
  //             }
  //           }, err => {
  //             this.message ="not affected";
  //             console.log(this.message);
  //           }
  //         );
  //       }
  //     }, err => {
  //       this.message = err.error.message;
  //       this.showWarn(err);
  //     }
  //   );
  // }
  Modifier(employeur: Employeur, id: number ){
    this.employeurService.update(employeur, id).
    subscribe(res => {
      if (!res.succes) {
        this.message = 'modification effectué avec succés';
        this.employeurService.getAllCache();
        localStorage.setItem('employeur',JSON.stringify(this.employeur));
        this.showSuccess();
        location.reload()
        // this.employeurService.getAllCache();
      } else {
        this.message = 'erreuuur';

        this.showSuccess();
      }
    }, err => {
      this.message = 'not effected';
      console.log(err);
    } ) ;

  }
}
