import { Component, OnInit } from '@angular/core';
import {EmployeurServiceService} from '../../api/employeur-service.service';
import {Employeur} from '../../models/employeur';
import {MessageService, PrimeNGConfig} from 'primeng/api';
import {showRuleCrashWarning} from 'tslint/lib/error';

@Component({
  selector: 'app-formsociete',
  templateUrl: './formsociete.component.html',
  styleUrls: ['./formsociete.component.css'],
  providers: [MessageService]

})
export class FormsocieteComponent implements OnInit {


  employeur: Employeur = new Employeur();
  message: any ;
  constructor(private employeurService: EmployeurServiceService,
              private messageService: MessageService,
              private primengConfig: PrimeNGConfig) {
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;

  }
  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Success', detail: this.message});
  }
  showWarn() {
    this.messageService.add({severity:'warn', summary: 'Warn', detail: this.message});
  }
  ajouter() {

    console.log('emplyeur:', this.employeur);
    this.employeurService.save(this.employeur).subscribe(res => {
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
