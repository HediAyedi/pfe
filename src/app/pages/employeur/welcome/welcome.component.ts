import { Component, OnInit } from '@angular/core';
import {MessageService, PrimeNGConfig} from 'primeng/api';
import {Employeur} from '../../../models/employeur';
import {Adresse} from '../../../models/adresse';
import {EmployeurService} from '../../../api/employeur.service';
import {AdresseService} from '../../../api/adresse.service';
import {Offre} from '../../../models/offre';
import {Langue} from '../../../models/langue';
import {LangueService} from '../../../api/caching services/langue.service';
import {OffreService} from '../../../api/offres.service';
import { TypeOffre } from 'src/app/models/type-offre';
import {SelectItem} from 'primeng/api';
import { Domaine } from 'src/app/models/domaine';

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
  domaines: Domaine[] = [];
  adresse: Adresse = new Adresse();
  domaine = new Domaine();
  
  offre_types: TypeOffre[]=[];
  selected_types: TypeOffre[]=[];
  selected_domaine: Domaine;

  items: SelectItem[];

  genres = ['indifférent', 'Femme', 'Homme'];
  experiences = ['1ans ', '3 ans', '5 ans', '10 ans'];
  niveau_education = ['Baccaulauréat', 'Bac +3', 'Bac +5', 'Ingénieur'];

  constructor(private employeurService: EmployeurService,
              private adresseService: AdresseService,
              private messageService: MessageService,
              private primengConfig: PrimeNGConfig,
              private langueService: LangueService,
              private offreService: OffreService) {
    }


  ngOnInit(): void {
    this.primengConfig.ripple = true;


    //Tableau des domaines from cache
    this.domaines = JSON.parse(localStorage.domainesCache || '[]');
    console.log("Les domaines:",this.domaines);


    //Tableau des types offres from cache
    this.offre_types = JSON.parse(localStorage.type_offresCache || '[]');
    console.log("Les offres:",this.offre_types);


    //Tableau des langues from cache
    this.langues=JSON.parse(localStorage.languesCache || '[]');
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
    this.offre.domaine= this.selected_domaine.domaine
    // adding offre types to the offer

    this.selected_langues.forEach(function (langue) {
      this.offre.langues.push(langue.id);
  }, this);
  

  // adding offre types to the offer
  this.selected_types.forEach(function (type) {
    this.offre.emploi_types.push(type.id);
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
          this.employeur.emplois.push(res);
          localStorage.setItem('employeur',JSON.stringify(this.employeur));
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
