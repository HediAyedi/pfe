import { Component, OnInit } from '@angular/core';
import {MessageService, PrimeNGConfig} from 'primeng/api';
import {Employeur} from '../../../models/employeur';
import {SecteurActivite} from '../../../models/secteur-activite';
import {Adresse} from '../../../models/adresse';
import {EmployeurService} from '../../../api/employeur.service';
import {SecteurActiviteService} from '../../../api/caching services/secteur-activite.service';
import {AdresseService} from '../../../api/adresse.service';
import {Offre} from '../../../models/offre';
import {Langue} from '../../../models/langue';
import {LangueService} from '../../../api/caching services/langue.service';
import {OffreService} from '../../../api/offres.service';
import { TypeOffre } from 'src/app/models/type-offre';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
  providers: [MessageService]

})
export class WelcomeComponent implements OnInit {

  message: any ;
  langue: Langue;
  langues: Langue[]=[];
  selected_langues: Langue[]=[];
  
  employeur= new Employeur();
  offre: Offre = new Offre();
  secteurs: SecteurActivite[] = [];
  adresse: Adresse = new Adresse();
  secteur = new SecteurActivite();
  
  offre_types: TypeOffre[]=[];
  selected_types: TypeOffre[]=[];
  constructor(private employeurService: EmployeurService,
              private secteurActiviteService: SecteurActiviteService,
              private adresseService: AdresseService,
              private messageService: MessageService,
              private primengConfig: PrimeNGConfig,
              private langueService: LangueService,
              private offreService: OffreService) { 

                

              }

  ngOnInit(): void {
    this.primengConfig.ripple = true;

    //Tableau des secteurs from cache
    this.secteurs = JSON.parse(localStorage.secteursCache || '[]');
    console.log("Les secteurs:",this.secteurs);


    //Tableau des types offres from cache
    this.offre_types = JSON.parse(localStorage.type_offresCache || '[]');
    console.log("Les secteurs:",this.offre_types);


    //Tableau des langues from cache
    this.langues=JSON.parse(localStorage["languesCache"] || "[]");
    console.log("Les :",this.langues);

    //Getting the logged in user from cache
    this.employeur = JSON.parse( localStorage.getItem('employeur'));
    console.log(this.employeur);
  }
  showSuccess() {
    this.messageService.add({severity: 'success', summary: 'Success', detail: this.message});
  }
  showWarn(err) {
    this.messageService.add({severity: 'warn', summary: 'Warn', detail: this.message});
    
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
    
    this.offre.employeur_id=this.employeur.id;


    // adding offre types to the offer

    this.selected_langues.forEach(function (langue) {
      this.offre.langues.push(langue.id);
  }, this);
  

  // adding offre types to the offer
  this.selected_types.forEach(function (type) {
    this.offre.emploiTypes.push(type.id);
}, this);
//Resetting the arrays
this.selected_langues = [];
this.selected_types = [];

console.log('offre:', this.offre);
    
    this.offreService.save(this.offre).subscribe(
      (res) => {
        console.log(res);
        if (res) {
          this.message = 'Ajout effectué avec succés';
          this.showSuccess();
          this.offreService.getAllCache();
          // localStorage.setItem('offresCache',JSON.stringify(this.offre));
          this.employeurService.getAllCache();
          this.offre = new Offre();
        }
      },
      (err) => {
        this.message = err.error;
        console.log(this.message);
      }
    );
  }

}
