// import { Component, OnInit } from '@angular/core';
//
// @Component({
//   selector: 'app-table-des-societe',
//   templateUrl: './table-des-societe.component.html',
//   styleUrls: ['./table-des-societe.component.scss']
// })
// export class TableDesSocieteComponent implements OnInit {
//
//   constructor() { }
//
//   ngOnInit(): void {
//   }
//
// }
import { Component, OnInit, Input } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import {Employeur} from '../../models/employeur';
import {EmployeurService} from '../../api/employeur.service';

@Component({
  selector: 'app-table-des-societe',
 templateUrl: './table-des-societe.component.html',
 styleUrls: ['./table-des-societe.component.scss'],
  styles: [`
        :host ::ng-deep .p-dialog .product-image {
            width: 150px;
            margin: 0 auto 2rem auto;
            display: block;
        }
    `],
})
export class TableDesSocieteComponent implements OnInit  {


  employeurs : Employeur[] = [];
  employeur : Employeur ;
  selectedEmployeur: Employeur[];
  message : any ;
  constructor(private messageService: MessageService, private confirmationService: ConfirmationService,private employeurService: EmployeurService)
  { }

  ngOnInit() {
    this.employeurs=JSON.parse(localStorage["employeursCache"] || "[]");
    if(this.employeurs.length==0){
      this.findAll();
      this.employeurService.getAllCache();
    }
  }


  VerifierEmployeur(employeur: Employeur, id: number) {
    employeur.verifie=!employeur.verifie ;
    console.log(employeur);

    this.employeurService.update(employeur, id)
      .subscribe(res => {
        if (!res.succes) {
          this.message="modification effectué avec succés";
          localStorage.setItem("employeursCache",JSON.stringify(this.employeurs));
          // this.employeurService.getAllCache();
        } else {
          this.message="erreuuur";
        }
      }, err => {
        this.message = 'not effected'
      } ) ;
  }

  ValiderEmployeur(employeur: Employeur, id: number) {
    employeur.active=!employeur.active ;
    this.employeurService.update(employeur, id)
      .subscribe(res => {
        if (!res.succes) {
          this.message="modification effectué avec succés";
          localStorage.setItem("employeursCache",JSON.stringify(this.employeurs));
          // this.employeurService.getAllCache();
        } else {
          this.message="erreuuur";
        }
      }, err => {
        this.message = 'not effected'
      } ) ;
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
