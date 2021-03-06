import { Component, OnInit } from '@angular/core';
import {Employeur} from '../../models/employeur';
import {ConfirmationService, MessageService, PrimeNGConfig} from 'primeng/api';
import {EmployeurService} from '../../api/employeur.service';

@Component({
  selector: 'app-carousel-societe',
  templateUrl: './carousel-societe.component.html',
  styleUrls: ['./carousel-societe.component.scss']
})
export class CarouselSocieteComponent implements OnInit {
  employeurs: Employeur[] = [];
  employeur: Employeur ;
  responsiveOptions;

  constructor(private primengConfig: PrimeNGConfig,
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
  }

  public findAll() {
    this.employeurService.getAll()
      .subscribe(data => {
        this.employeurs = data;
      }, err => {
        console.log(err);
      });
  }

}
