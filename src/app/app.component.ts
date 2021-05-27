import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {LangueService} from './api/caching services/langue.service';
import {SecteurActiviteService} from './api/caching services/secteur-activite.service';
import { CandidatService } from './api/candidat.service';
import { EmployeurService } from './api/employeur.service';
import { TypeOffreService } from './api/caching services/type-offre.service';
import { Langue } from './models/Langue';
import { SecteurActivite } from './models/secteur-activite';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  langues: Langue[]=[];
  secteurs:SecteurActivite[];

  constructor(
    private langueService: LangueService,
    private secteurActiviteService: SecteurActiviteService,
    private employeurService: EmployeurService,
    private candidatService: CandidatService,
    private type_offreService: TypeOffreService,
    private router: Router,
    ) {

      this.findLangues();
      this.findSecteurs();
      this.findTypeOffres();

  }

  public findLangues(){
    this.langueService.getAll();
  }
  public findSecteurs(){
    this.secteurActiviteService.getAll();
  }
  public findTypeOffres(){
    this.type_offreService.getAll();
  }
  // public findEmployeurs(){
  //   this.employeurService.getAllCache();
  // }
  // public findCandidats() {
  //   this.candidatService.getAllCache();
  // }
  // public findOffres() {
  //   this.offreService.getAllCache();
  // }
  title = 'pfe';

  isAdmin() {
    return this.router.url.includes("/admin");
}

  isEmployeur() {
    return this.router.url.includes("/employeur");
  }
}
