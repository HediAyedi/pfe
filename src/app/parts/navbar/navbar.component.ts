import { Component, OnInit } from '@angular/core';
import {Candidat} from '../../models/candidat';
import {Offres} from '../../models/offres';
import {OffresService} from '../../api/offres.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  offres: Offres[] = [];
  offre: Offres;

  constructor(private offreService: OffresService) { }

  ngOnInit(): void {
    this.findAll();
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
