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

  constructor() { }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Tous les offres',
        icon: 'las la-globe fa-lg',
      },
      {
        label: 'Enreprise',
        icon: 'las la-industry fa-lg',
        routerLink: ['/cards/employeurs'],

      },
      {
        label: 'Rechercher par Spécialité',
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
                label: '\tLille',
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
                label: '\tNantes',
              },
              {
                label: '\tMarseille',
              },

            ]
          }
        ]
      },
      {
        label: 'Blog',
        icon: 'las la-blog fa-lg'
      }
    ];
    this.boutton = [
      {
        label: 'Candidat', icon: 'las la-graduation-cap fa-lg'
      },
      {
        label: 'Employeur',  icon: 'las la-user-tie fa-lg'
      },
      {separator: true},
      {separator: true},

      {separator: true},
      {
        label: 'Pas de Compte : Signup', icon: 'pi pi-info'
      },

      {separator: true},
      {
        label: 'Signup us candidat', icon: 'las la-graduation-cap fa-lg'  ,
        routerLink: ['/candidat'],
      },
      {separator: true},
      {
        label: 'Signup us Employeur', icon: 'las la-user-tie fa-lg'  ,
        routerLink: ['/societe'],
      },

    ];
  }
}

