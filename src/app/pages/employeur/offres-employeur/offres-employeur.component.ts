import { Component, OnInit } from '@angular/core';
import { Employeur } from '../../../models/employeur';
import { Offre } from '../../../models/offre';
import {
  ConfirmationService,
  MessageService,
  PrimeNGConfig,
  SelectItem,
} from 'primeng/api';
import { Router } from '@angular/router';
import { EmployeurService } from '../../../api/employeur.service';
import { Langue } from '../../../models/langue';
import { OffreService } from '../../../api/offres.service';
import { TypeOffre } from 'src/app/models/type-offre';
import { Domaine } from 'src/app/models/domaine';

@Component({
  selector: 'app-offres-employeur',
  templateUrl: './offres-employeur.component.html',
  styleUrls: ['./offres-employeur.component.css'],
})
export class OffresEmployeurComponent implements OnInit {
  langues: Langue[];

  sortOptions: SelectItem[];

  sortOrder: number;

  offres= [];
  selectedOffre = new Offre();
  offre = new Offre();
  sortField: string;
  message: string;
  editing: boolean;

  genres = ['indifférent', 'Femme', 'Homme'];
  experiences = ['0-1 an ', '2 ans ', '3 ans', '4 ans', '+5 ans'];
  niveau_education = ['Baccaulauréat', 'Bac +3', 'Bac +5', 'Ingénierie'];

  selected_langues=[];
  selected_types=[];
  selected_domaine: any;
  domaines: Domaine[]=[];
  offre_types=[];
  employeur: Employeur ;
  unselected_langues=[];
  unselected_types=[];

  constructor(
    private primengConfig: PrimeNGConfig,
    private offreService: OffreService,
    private messageService: MessageService,
    private employeurService: EmployeurService,
    private router: Router
  ) {}

  ngOnInit(): void {
    //Tableau des domaines from cache
    this.domaines = JSON.parse(localStorage.domainesCache || '[]');
    console.log("Les domaines:",this.domaines);


    //Tableau des types offres from cache
    this.offre_types = JSON.parse(localStorage.type_offresCache || '[]');
    console.log("Les offres types:",this.offre_types);

    //Tableau des langues from cache
    this.langues=JSON.parse(localStorage.languesCache || '[]');
    console.log("Les langues:",this.langues);

    // Getting the logged in user from cache
    this.employeur = JSON.parse( localStorage.getItem('employeur'));
    console.log(this.employeur);
    
    // Getting offres from Employeur cached in localstorage
    console.log('Employeur emplois : ' , this.employeur.emplois);
    this.offres = this.employeur.emplois;
    
    this.primengConfig.ripple = true;
    
  }

  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: this.message,
    });
  }

  public findEmployeur(id) {
    this.employeurService.get(id).subscribe(
      (data) => {
        this.employeur = data;
        this.offres = this.employeur.emplois;
        localStorage.setItem('employeur', JSON.stringify(this.employeur));
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // Navigats to specific offer candidatures
  navigate(id) {
    console.log(id);
    this.router.navigate(['/employeur/offres/', id,'candidatures']);
  }

  

  add() {
    this.offre.employeur_id = this.employeur.id;
    this.offre.domaine = this.selected_domaine.domaine;

    // adding langues to the offer
    this.selected_langues.forEach(function (langue) {
      this.offre.langues.push(langue.id);
    }, this);

    // adding offre types to the offer
    this.selected_types.forEach(function (type) {
      this.offre.emploi_types.push(type.id);
    }, this);

    console.log('offre:', this.offre);

    this.offreService.save(this.offre).subscribe(
      (res) => {
        console.log(res);
        if (res) {
          this.message = 'Ajout effectué avec succés';
          this.offres.push(res);
          localStorage.setItem('employeur', JSON.stringify(this.employeur));
          this.findEmployeur(this.employeur.id);
          this.cancel();
          this.employeurService.getAllCache();
          this.offreService.getAllCache();
          this.offre = new Offre();
        }
      },
      (err) => {
        this.message = err.error;
        console.log(this.message);
      }
    );
  }

  edit() {
    this.offre.domaine = this.selected_domaine.domaine;
    this.offre.emploi_types=[];
    this.offre.langues=[];
    // adding langues to the offer
    this.selected_langues.forEach(function (langue) {
      this.offre.langues.push(langue.id);
    }, this);

    // adding offre types to the offer
    this.selected_types.forEach(function (type) {
      this.offre.emploi_types.push(type.id);
    }, this);

    console.log('offre:', this.offre);

    this.offreService.update(this.offre, this.offre.id).subscribe(
      (res) => {
        console.log(res);
        if (res) {
          this.message = 'Ajout effectué avec succés';
          this.findEmployeur(this.employeur.id);
          localStorage.setItem('employeur', JSON.stringify(this.employeur));
          this.employeurService.getAllCache();
          this.offreService.getAllCache();
          this.cancel();
          this.offre = new Offre();
        }
      },
      (err) => {
        this.message = err.error;
        console.log(this.message);
      }
    );
  }

  delete(id: number) {
    this.offreService.delete(id).subscribe(
      (res) => {
        this.message = 'suppression effectué avec succés';
        this.findEmployeur(this.employeur.id);
        this.employeurService.getAllCache();
        this.offreService.getAllCache();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  //Shows the form modal
  showDialog() {
    var modal = document.getElementById('offreForm');
    modal.style.display = 'block';

    var offre_langues: Langue[] = this.offre.langues;
    var offre_types: TypeOffre[] = this.offre.emploi_types;
    var offre_domaine = this.offre.domaine;
        
        //Loop to get the data from the back and transform it into the same format as the domaines array
        this.domaines.forEach((domaine) => {
          if (offre_domaine == domaine.domaine) {
            this.selected_domaine=domaine
          }
        }, this);

        //Loop to get the data from the back and transform it into the same format as the langues array
        this.langues.forEach((langue) => {
          offre_langues.forEach((cv_langue) => {
            if (cv_langue.id == langue.id) {
              this.selected_langues.push(langue);
            }
          }, this);
        }, this);

        // Get the unselected languages to show them in the multiselect
        this.unselectedLangues();
        

        //Loop to get the data from the back and transform it into the same format as the types offres array
        this.offre_types.forEach((offre_type) => {
          offre_types.forEach((item) => {
            if (item.id == offre_type.id) {
              this.selected_types.push(offre_type);
            }
          }, this);
        }, this);

        // Get the unselected languages to show them in the multiselect
        this.unselectedTypes();

  }

  //Hides the form modal
  cancel() {
    var modal = document.getElementById('offreForm');
    modal.style.display = 'none';
        
    //Resetting the form
    this.offre = new Offre();
    this.selected_langues = [];
    this.selected_types = [];
    this.selected_domaine=null;
    this.editing = false;
  }

  //Shows the editing form modal
  showEditDialog(offre) {
    this.showDialog();
    this.offre = offre;
    
    var offre_langues: Langue[] = this.offre.langues;
    var offre_types: TypeOffre[] = this.offre.emploi_types;
    var offre_domaine = this.offre.domaine;
        
        //Loop to get the data from the back and transform it into the same format as the domaines array
        this.domaines.forEach((domaine) => {
          if (offre_domaine == domaine.domaine) {
            this.selected_domaine=domaine
          }
        }, this);

        //Loop to get the data from the back and transform it into the same format as the langues array
        this.langues.forEach((langue) => {
          offre_langues.forEach((cv_langue) => {
            if (cv_langue.id == langue.id) {
              this.selected_langues.push(langue);
            }
          }, this);
        }, this);

        // Get the unselected languages to show them in the multiselect
        this.unselectedLangues();
        

        //Loop to get the data from the back and transform it into the same format as the types offres array
        this.offre_types.forEach((offre_type) => {
          offre_types.forEach((item) => {
            if (item.id == offre_type.id) {
              this.selected_types.push(offre_type);
            }
          }, this);
        }, this);

        // Get the unselected languages to show them in the multiselect
        this.unselectedTypes();
    this.editing = true;
  }


  // Defines the unselected items
  unselectedLangues() {
    this.unselected_langues = [];
    this.unselected_langues = this.langues.filter(
      item => this.selected_langues.indexOf(item) < 0
    );
  }

  // Defines the unselected items
  unselectedTypes() {
    this.unselected_types = [];
    this.unselected_types = this.offre_types.filter(
      (item) => this.selected_types.indexOf(item) < 0
    );
  }
}
