import { Component, OnInit } from '@angular/core';
import {Employeur} from '../../../models/employeur';
import {Offre} from '../../../models/offre';
import {ConfirmationService, MessageService, PrimeNGConfig, SelectItem} from 'primeng/api';
import {Router} from '@angular/router';
import {EmployeurService} from '../../../api/employeur.service';
import {Langue} from '../../../models/langue';
import {OffreService} from '../../../api/offres.service';
import {Blog} from '../../../models/blog';

@Component({
  selector: 'app-offres-employeur',
  templateUrl: './offres-employeur.component.html',
  styleUrls: ['./offres-employeur.component.css']
})
export class OffresEmployeurComponent implements OnInit {
  langues: Langue[];

  sortOptions: SelectItem[];

  sortOrder: number;

  offres: Offre[] = [];
  selectedOffre = new Offre();
  employeur= new Employeur() ;
  offre = new Offre();

  sortField: string;

  constructor(private primengConfig: PrimeNGConfig,
              private offreService: OffreService,
              private messageService: MessageService,
  ) {
  }

  ngOnInit(): void {
    // this.offres = JSON.parse(localStorage.offresCache || '[]');
    if (this.offres.length === 0){
      this.findAll();
      this.offreService.getAllCache();
    }
    this.langues = JSON.parse(localStorage.languesCache || '[]');
    // console.log(this.langues);
    this.primengConfig.ripple = true;
    this.employeur = JSON.parse(localStorage.getItem("employeur"));
    console.log("traaaaaaaaaaaa : " + this.employeur.id);


  }

  // for (const i in data){
  // if (data[i].employeur_id === JSON.parse(localStorage.getItem("employeur").id) ){
  //
  showSuccess() {
    this.messageService.add({severity: 'success', summary: 'Success', detail: this.message});
  }


  public findAll() {
    this.offreService.getAll()
      .subscribe(data => {
        this.offres = data.filter(x => x.employeur_id === this.employeur.id);
        console.log("data :::: :: :: :" + data);
        console.log("offffffffffres:::: :: :: :" + this.offres);

        // console.log(this.offres);
      }, err => {
        console.log(err);
      });
  }


  onRowEditSave(offre: Offre,id: number) {
    this.offreService.update(offre, id)
      .subscribe(res => {
        if (!res.succes) {
          this.message="modification effectué avec succés";
          // this.employeurService.getAllCache();
        } else {
          this.message="erreuuur";
        }
      }, err => {
        this.message = 'not effected'
      } ) ;
  }

  // route(id) {
  //   console.log(id);
  //   this.router.navigate(['/offre', id]);
  // }

  delete(id:number){
    this.offreService.delete(id).subscribe(res => {
      if (!res.succes) {
        this.message="suppression effectué avec succés";
        this.findAll();
      } else {
        this.message="erreuuur";
        this.findAll();

      }
    }, err => {
      this.message = 'not effected';
      this.findAll();

    } ) ;
  }

}
