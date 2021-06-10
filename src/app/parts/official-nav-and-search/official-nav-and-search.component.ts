import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-official-nav-and-search',
  templateUrl: './official-nav-and-search.component.html',
  styleUrls: ['./official-nav-and-search.component.css']
})
export class OfficialNavAndSearchComponent implements OnInit {
  items: MenuItem[];
  boutton: MenuItem[];
  show: boolean;

  constructor() { }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Tous les offres',
        icon: 'las la-globe fa-lg',
        routerLink: ['/offres'],
      },
      {
        label: 'Enreprises',
        icon: 'las la-industry fa-lg',
        routerLink: ['/cardsEmployeurs'],

      },
      {
        label: 'Rechercher par Domaine',
        icon: 'lab la-searchengin fa-lg',
        items: [
          {
            label: 'Economie & Gestion',
            icon: 'las la-landmark',

          },
          {
            label: 'Informatique',
            icon: 'las la-desktop',

          },
          {
            label: 'Centres d \'appels',
            icon: 'las la-headphones',
          }
        ]
      },
      {
        label: 'Blog',
        icon: 'las la-blog fa-lg',
        routerLink: ['/blog'],

      }
    ];
    
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
  showLogin(){
    this.show=!this.show;
  }
}

