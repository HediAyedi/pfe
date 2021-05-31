import { Component, OnInit } from '@angular/core';
import {Employeur} from '../../models/employeur';
import {ConfirmationService, MessageService, PrimeNGConfig} from 'primeng/api';
import {EmployeurService} from '../../api/employeur.service';
import {Offre} from '../../models/offre';
import {OffreService} from '../../api/offres.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-offre-carousel',
  templateUrl: './offre-carousel.component.html',
  styleUrls: ['./offre-carousel.component.scss']
})
export class OffreCarouselComponent implements OnInit {

  offres: Offre[] = [];
  selectedOffre = new Offre();

  employeurs: Employeur[] = [];
  employeur: Employeur ;
  responsiveOptions;

  constructor(private primengConfig: PrimeNGConfig,
              private offreService: OffreService,
              private router: Router,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private employeurService: EmployeurService) {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];

  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.employeurs=JSON.parse(localStorage["employeursCache"] || "[]");

    if(this.employeurs.length==0){
      this.findAll();
      this.employeurService.getAllCache();
    }

    console.log("1" + this.employeurs);

    this.offres = JSON.parse(localStorage.offresCache || '[]');
    if (this.offres.length === 0){
      this.findAll();
      this.offreService.getAllCache();
    }
    // this.langues = JSON.parse(localStorage.languesCache || '[]');
    // console.log(this.langues);
    // this.primengConfig.ripple = true;
  }

  public findAll() {
    this.offreService.getAll()
      .subscribe(data => {
        this.offres = data;
        console.log(this.offres);
      }, err => {
        console.log(err);
      });
  }
  route(id){
    console.log(id);
    this.router.navigate(['/offre',id]);
  }
}
