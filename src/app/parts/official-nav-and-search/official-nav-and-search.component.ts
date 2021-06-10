import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MenuItem} from 'primeng/api';
import { Candidat } from 'src/app/models/candidat';
import { Employeur } from 'src/app/models/employeur';

@Component({
  selector: 'app-official-nav-and-search',
  templateUrl: './official-nav-and-search.component.html',
  styleUrls: ['./official-nav-and-search.component.css']
})
export class OfficialNavAndSearchComponent implements OnInit {
  items: MenuItem[];
  boutton: MenuItem[];
  employeur: Employeur;
  candidat: Candidat;

  constructor(private router: Router) { }

  ngOnInit(): void {
    
    this.employeur=JSON.parse(localStorage.getItem("employeur"));
    this.candidat=JSON.parse(localStorage.getItem("candidat"));
    
    this.items = [
      {
        label: 'Tous les offres',
        icon: 'las la-globe fa-lg',
        routerLink: ['/offres'],
      },
      {
        label: 'Les enreprises',
        icon: 'las la-industry fa-lg',
        routerLink: ['/cardsEmployeurs'],

      },
      {
        label: 'Blog',
        icon: 'las la-blog fa-lg',
        routerLink: ['/blog'],

      }
    ];
    
  }

  navigateCandidat(){
    this.router.navigate(["candidat/home"]);
  }

  navigateEmployeur(){
    this.router.navigate(["employeur/home"]);
  }

  logOut(){
    this.employeur=null;
    this.candidat=null;
    localStorage.removeItem("candidat");
    localStorage.removeItem("employeur");
    localStorage.removeItem("token");
    this.router.navigate(["/offres"]);
    console.log('Logged Out');
  }
  showSignInDialog(){
    var modal = document.getElementById("signIn");
    modal.style.display = "block";
  }

  showSignUpDialog(){
    var modal = document.getElementById("signUp");
    modal.style.display = "block";
  }

  cancel(){
    var signUpModal = document.getElementById("signUp");
    signUpModal.style.display = "none";
    var signInModal = document.getElementById("signIn");
    signInModal.style.display = "none";
  }
  
}

