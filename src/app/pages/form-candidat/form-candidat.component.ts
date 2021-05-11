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

  constructor(private candidatService: CandidatService,
              private messageService: MessageService,
              private primengConfig: PrimeNGConfig) {
  }

  candidat: Candidat = new Candidat();
  message: any;
  civilites = ['M', 'Mme', 'Mlle'];


//
//      IMAGE UPLOAD
//
  /* Variabe to store file data */
  filedata = null;
  myFormData = new FormData();

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }
  /* File onchange event */
  imageEvent(e){
      this.filedata = e.target.files[0];
      this.candidat.image = this.filedata;
  }




  showSuccess() {
    this.messageService.add({severity: 'success', summary: 'Success', detail: this.message});
  }

  showWarn(err) {
    this.messageService.add({severity: 'warn', summary: 'Warn', detail: this.message});
    if (err.error.errors.email){this.messageService.add({severity: 'warn', summary: 'Warn', detail: err.error.errors.email}); }
    if (err.error.errors.mot_de_passe){this.messageService.add({severity: 'warn', summary: 'Warn', detail: err.error.errors.mot_de_passe}); }
    if (err.error.errors.civilite){this.messageService.add({severity: 'warn', summary: 'Warn', detail: err.error.errors.civilite}); }
  }

  ajouter() {

    console.log('candidat:', this.candidat);
    console.log('Image:', this.filedata);
    this.candidatService.save(this.candidat).subscribe(res => {
        if (res.candidat) {
          this.message = 'Ajout effectué avec succés attends La vérification de votre compte ';
          this.candidatService.getAllCache();
          this.showSuccess();
        }
      }, err => {
        this.message = err.error.message;
        this.showWarn(err);

      }
    );
  }

}
