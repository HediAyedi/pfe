import { Component, OnInit } from '@angular/core';
import {Employeur} from '../../models/employeur';
import {Candidat} from '../../models/candidat';
import {ProductService} from '../table-des-societe/productservice';
import {ConfirmationService, MessageService} from 'primeng/api';
import {EmployeurServiceService} from '../../api/employeur-service.service';
import {CandidatService} from '../../api/candidat.service';

@Component({
  selector: 'app-table-des-candidats',
  templateUrl: './table-des-candidats.component.html',
  styleUrls: ['./table-des-candidats.component.css']
})
export class TableDesCandidatsComponent implements OnInit {
  candidats: Candidat[] = [];
  candidat: Candidat;
  selectedCandidat: Candidat[];
  message: any;

  constructor(private candidatService: CandidatService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private employeurService: EmployeurServiceService) {
  }

  ngOnInit(): void {
    this.candidats=JSON.parse(localStorage["candidatsCache"] || "[]");
    console.log(this.candidats);

  }

  

  VerifierCandidat(candidat: Candidat, id: number) {
    candidat.verifie = !candidat.verifie;
    // console.log(employeur);

    this.candidatService.update(candidat, id)
      .subscribe(res => {
        if (res.succes) {
          this.message = "modification effectué avec succés";


        } else {
          this.message = "erreuuur";
        }
      }, err => {
        this.message = 'not effected'
      });
  }

//   ValiderEmployeur(candidat: Candidat, id: number) {
//     employeur.active=!employeur.active ;
//     this.employeurService.update(employeur, id)
//       .subscribe(res => {
//         if (res.succes) {
//           this.message="modification effectué avec succés";
//
//
//         } else {
//           this.message="erreuuur";
//         }
//       }, err => {
//         this.message = 'not effected'
//       } ) ;
//   }
// }

}
