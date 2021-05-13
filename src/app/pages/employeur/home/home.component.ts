import { Component, OnInit } from '@angular/core';
import {Employeur} from '../../../models/employeur';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  employeur : any;

  constructor() { }

  ngOnInit(): void {
    this.employeur = JSON.parse( localStorage.getItem('employeur'));
    console.log(this.employeur);
    console.log(this.employeur.id);

  }

}
