import { Component, OnInit } from '@angular/core';
import {PrimeNGConfig, SelectItem} from 'primeng/api';
import {Product} from '../table-des-societe/product';
import {ProductService} from '../table-des-societe/productservice';
import {OffresService} from '../../api/offres.service';
import {Offres} from '../../models/offres';

@Component({
  selector: 'app-offres',
  templateUrl: './offres.component.html',
  styleUrls: ['./offres.component.scss']
})
export class OffresComponent implements OnInit {
  products: Product[];

  sortOptions: SelectItem[];

  sortOrder: number;

  offres: Offres[];

  sortField: string;
  constructor(private primengConfig: PrimeNGConfig,
              private offreService: OffresService) { }

  ngOnInit(): void {
    // this.findAll();

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
      }, err => {
        console.log(err);
      });
  }

}
