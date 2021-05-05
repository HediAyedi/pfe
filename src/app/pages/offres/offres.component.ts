import { Component, OnInit } from '@angular/core';
import {PrimeNGConfig, SelectItem} from 'primeng/api';
import {ProductService} from '../table-des-societe/productservice';
import {OffreService} from '../../api/offres.service';
import {Offre} from '../../models/offre';
import { Langue } from 'src/app/models/Langue';

@Component({
  selector: 'app-offres',
  templateUrl: './offres.component.html',
  styleUrls: ['./offres.component.scss']
})
export class OffresComponent implements OnInit {
  langues: Langue[];

  sortOptions: SelectItem[];

  sortOrder: number;

  offres: Offre[]=[];
  selectedOffre=new Offre();

  sortField: string;
  constructor(private primengConfig: PrimeNGConfig,
              private offreService: OffreService) { }

  ngOnInit(): void {
    this.findAll();
    this.langues=JSON.parse(localStorage["languesCache"] || "[]");
    console.log(this.langues);
    this.primengConfig.ripple = true;

  }
  // onSortChange(event) {
  //   const value = event.value;
  //
  //   if (value.indexOf('!') === 0) {
  //     this.sortOrder = -1;
  //     this.sortField = value.substring(1, value.length);
  //   }
  //   else {
  //     this.sortOrder = 1;
  //     this.sortField = value;
  //   }
  // }


  public findAll() {
    this.offreService.getAll()
      .subscribe(data => {
        this.offres = data;
        console.log(this.offres);
      }, err => {
        console.log(err);
      });
  }

}
