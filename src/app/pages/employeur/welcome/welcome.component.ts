import { Component, OnInit } from '@angular/core';
import {MessageService, PrimeNGConfig} from 'primeng/api';
import {Employeur} from '../../../models/employeur';
import {SecteurActivite} from '../../../models/secteur-activite';
import {Adresse} from '../../../models/adresse';
import {EmployeurServiceService} from '../../../api/employeur-service.service';
import {SecteurActiviteService} from '../../../api/caching services/secteur-activite.service';
import {AdresseService} from '../../../api/adresse.service';
import {Offre} from '../../../models/offre';
import {Langue} from '../../../models/langue';
import {LangueService} from '../../../api/caching services/langue.service';
import {OffreService} from '../../../api/offres.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
  providers: [MessageService]

})
export class WelcomeComponent implements OnInit {

  message: any ;
  langue: Langue;
  employeur: Employeur = new Employeur();
  offre: Offre = new Offre();
  secteurs: SecteurActivite[] = [];
  adresse: Adresse = new Adresse();
  secteur = new SecteurActivite();
  constructor(private employeurService: EmployeurServiceService,
              private secteurActiviteService: SecteurActiviteService,
              private adresseService: AdresseService,
              private messageService: MessageService,
              private primengConfig: PrimeNGConfig,
              private langueService: LangueService,
              private offreService: OffreService) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.secteurs = JSON.parse(localStorage.secteursCache || '[]');
    this.langue = JSON.parse(localStorage.languesCache || '[]');
    console.log(this.langue);
    // this.employeur = JSON.parse( localStorage.getItem('employeur'));
    // console.log(this.employeur);
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
  // Modifier(employeur: Employeur, id: number ){
  //   this.employeurService.update(employeur, id).
  //   subscribe(res => {
  //     if (res.succes) {
  //       this.message = 'modification effectué avec succés';
  //       this.employeurService.getAllCache();
  //       this.showSuccess();
  //       // this.employeurService.getAllCache();
  //     } else {
  //       this.message = 'erreuuur';
  //       this.showSuccess();
  //     }
  //   }, err => {
  //     this.message = 'not effected';
  //     this.showWarn(err);
  //   } ) ;
  //
  // }
  Ajouter() {
    console.log('offre:', this.offre);
    // this.offre.employeur_id = JSON.parse(localStorage.getItem('employeur.id'));
    this.offreService.save(this.offre).subscribe(
      (res) => {
        if (res.offre) {
          this.message =
            'Ajout effectué avec succés';
          // this.candidatService.getAllCache();
          // localStorage.setItem('candidat', JSON.stringify(res.candidat));
          // localStorage.setItem('token', res.token);

          this.showSuccess();
        }
      },
      (err) => {
        this.message = err.error.message;
        this.showWarn(err);
      }
    );
  }

}
