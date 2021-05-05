import { Component, OnInit } from '@angular/core';
import {Candidat} from '../../models/candidat';
import {Offre} from '../../models/offre';
import {OffreService} from '../../api/offres.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  offres: Offre[] = [];
  offre: Offre;

  constructor(private offreService: OffreService) { }

  ngOnInit(): void {
    this.offres=JSON.parse(localStorage["offresCache"] || "[]");
    if(this.offres.length==0){
      this.findAll();
    }
    console.log(this.offres);
  }
  public findAll() {
    this.offreService.getAll()
      .subscribe(data => {
        this.offres = data;
      }, err => {
        console.log(err);
      });
  }

}
