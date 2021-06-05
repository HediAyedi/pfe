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
        label: 'Enreprise',
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
        label: 'Recherche par région',
        icon: 'las la-search-location fa-lg',
        items: [
          {
            label: 'Allemagne',
            items: [
              {
                label: 'Baden-Württemberg\n',
              },
              {
                label: 'Bavaria',
              },
              {
                label: 'Berlin',
              },
              {
                label: 'Brandenburg',
              },
              {
                label: 'Bremen',
              },
              {
                label: 'Hamburg',
              },
              {
                label: 'Hesse',
              },
              {
                label: 'Lower Saxony',
              },
              {
                label: 'Mecklenburg-Vorpommern',
              },
              {
                label: 'North Rhine-Westphalia',
              },
              {
                label: 'Rhineland-Palatinate',
              },
              {
                label: 'Saarland',
              },
              {
                label: 'Saxony',
              },
              {
                label: 'Saxony-Anhalt',
              },
              {
                label: 'Schleswig-Holstein',
              },
              {
                label: 'Thuringia',
              },

            ]
          },
          {
            label: 'France',
            items: [
              {
                label: 'Lyon',
              },
              {
                label: 'Dijon',
              },
              {
                label: 'Rennes',
              },
              {
                label: 'Orléans',
              },
              {
                label: 'Ajaccio',
              },
              {
                label: 'Strasbourg',
              },
              {
                label: 'Lille',
              },
              {
                label: 'Paris',
              },
              {
                label: 'Rouen',
              },
              {
                label: 'Bordeaux',
              },
              {
                label: 'Toulouse',
              },
              {
                label: 'Nantes',
              },
              {
                label: 'Marseille',
              },

            ]
          }
        ]
      },
      {
        label: 'Blog',
        icon: 'las la-blog fa-lg',
        routerLink: ['/blog'],

      }
    ];
    this.boutton = [
      {
        label: 'Candidat', icon: 'las la-graduation-cap fa-lg',
        routerLink: ['/loginCandidat'],
      },
      {
        label: 'Employeur',  icon: 'las la-user-tie fa-lg',
        routerLink: ['/loginEmployeur'],
      },
      {separator: true},
      {
        label: 'Pas de Compte : S\'inscrire', icon: 'pi pi-info'
      },

      {separator: true},
      {
        label: 'S\'inscrire en tant qu\'un candidat', icon: 'las la-graduation-cap fa-lg'  ,
        routerLink: ['/SignUpCandidat'],
      },
      {
        label: 'S\'inscrire en tant qu\'un employeur', icon: 'las la-user-tie fa-lg'  ,
        routerLink: ['/SignUpEmployeur'],
      },

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

