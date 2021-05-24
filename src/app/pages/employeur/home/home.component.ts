import { Component, OnInit } from '@angular/core';
import {Employeur} from '../../../models/employeur';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  employeur =new Employeur();
  display=false;

  constructor(public router: Router) { }

  ngOnInit(): void {
    this.employeur = JSON.parse( localStorage.getItem('employeur'));
    console.log(this.employeur);
    console.log(localStorage.getItem('employeur'));
    console.log(this.employeur.id);

  }

  signOut(){
    localStorage.removeItem('employeur');
    localStorage.removeItem('token');
    this.router.navigate(['/offres']);
  }

}
