import { Component, OnInit } from '@angular/core';
import {ConfirmationService, MessageService, PrimeNGConfig} from 'primeng/api';
import {Employeur} from '../../models/employeur';
import {EmployeurService} from '../../api/employeur.service';
import { Offre } from 'src/app/models/offre';
import { Router } from '@angular/router';

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
              private router:Router,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private employeurService: EmployeurService) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.employeurs=JSON.parse(localStorage["employeursCache"] || "[]");

      this.findAll();
    
  }

  public findAll() {
    this.employeurService.getAll()
      .subscribe(data => {
        this.employeurs = data;
        localStorage.setItem("employeursCache", JSON.stringify(this.employeurs))
      }, err => {
        console.log(err);
      });
  }
  
  //Shows the modal
  showDialog(employeur:Employeur) {
    
    this.router.navigate(['/offres',employeur.id]);
  }


   route(id){
     console.log(id);
     this.router.navigate(['/offre',id]);
   }
   
    


}
