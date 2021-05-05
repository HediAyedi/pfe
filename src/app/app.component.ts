import { Component } from '@angular/core';
import {LangueService} from './api/caching services/langue.service';
import {SecteurActiviteService} from './api/caching services/secteur-activite.service';
import { CandidatService } from './api/candidat.service';
import { EmployeurServiceService } from './api/employeur-service.service';
import { OffreService } from './api/offres.service';
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
    private employeurService: EmployeurServiceService,
    private candidatService: CandidatService,
    private offreService: OffreService,
    ) { 
      this.findOffres();
      this.findEmployeurs();
      this.findCandidats();
      this.findLangues();
      this.findSecteurs();
      
  }

  public findLangues(){
    this.langueService.getAll();
  }
  public findSecteurs(){
    this.secteurActiviteService.getAll();
  }
  public findEmployeurs(){
    this.employeurService.getAllCache();
  }
  public findCandidats() {
    this.candidatService.getAllCache();
  }
  public findOffres() {
    this.offreService.getAllCache();
  }
  title = 'pfe';
}
