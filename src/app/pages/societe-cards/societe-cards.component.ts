import { Component, OnInit } from '@angular/core';
import {ConfirmationService, MessageService, PrimeNGConfig} from 'primeng/api';
import {Employeur} from '../../models/employeur';
import {ProductService} from '../table-des-societe/productservice';
import {EmployeurServiceService} from '../../api/employeur-service.service';
import { Offre } from 'src/app/models/offre';

@Component({
  selector: 'app-societe-cards',
  templateUrl: './societe-cards.component.html',
  styleUrls: ['./societe-cards.component.css']
})
export class SocieteCardsComponent implements OnInit {

  employeurs: Employeur[] = [];
  employeur= new Employeur() ;
  offres: Offre[]=[];

  constructor(private primengConfig: PrimeNGConfig,
              private productService: ProductService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private employeurService: EmployeurServiceService) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.findAll();
    console.log("1" + this.employeurs);
  }

  public findAll(){
    this.employeurService.getAll()
      .subscribe(data => {
        this.employeurs = data;
        console.log("2 : " + this.employeurs[1].nom);
      }, err => {
        console.log(err);
      });
  }

  display: boolean = false;

  showDialog(employeur:Employeur) {
    
    this.display = true;
    this.offres=employeur.emplois;

   } 
   
    


}
