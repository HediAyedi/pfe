import { Component } from '@angular/core';
import {LangueService} from './api/caching services/langue.service';
import {SecteurActiviteService} from './api/caching services/secteur-activite.service';
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
  constructor(private langueService: LangueService,private secteurActiviteService: SecteurActiviteService) { 
    this.findLangues();
    this.findSecteurs();
  }

  public findLangues(){
    this.langueService.getAll();
  }
  public findSecteurs(){
    this.secteurActiviteService.getAll();
  }
  title = 'pfe';
}
