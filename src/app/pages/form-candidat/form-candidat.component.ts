import { Component, OnInit } from '@angular/core';
import {Candidat} from '../../models/candidat';
import {CandidatService} from '../../api/candidat.service';
import {MessageService, PrimeNGConfig} from 'primeng/api';

@Component({
  selector: 'app-form-candidat',
  templateUrl: './form-candidat.component.html',
  styleUrls: ['./form-candidat.component.css']
})
export class FormCandidatComponent implements OnInit {

  candidat: Candidat = new Candidat();
  message: any;

  constructor(private candidatService: CandidatService,
              private messageService: MessageService,
              private primengConfig: PrimeNGConfig) {
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  showSuccess() {
    this.messageService.add({severity: 'success', summary: 'Success', detail: this.message});
  }

  showWarn() {
    this.messageService.add({severity: 'warn', summary: 'Warn', detail: this.message});
  }

  ajouter() {

    console.log('candidat:', this.candidat);
    this.candidatService.save(this.candidat).subscribe(res => {
        if (!res.succes) {
          this.message = 'Ajout effectué avec succés attends La vérification de votre compte ';
          this.showSuccess();
          console.log(this.message);
        }
      }, err => {
        this.message = 'not effected';
        this.showWarn();

      }
    );
  }

}
