import { Component, OnInit } from '@angular/core';
import {Product} from '../../pages/table-des-societe/product';
import {ProductService} from '../../pages/table-des-societe/productservice';
import {Candidat} from '../../models/candidat';
import {CandidatService} from '../../api/candidat.service';

@Component({
  selector: 'app-draganddrop-test',
  templateUrl: './draganddrop-test.component.html',
  styleUrls: ['./draganddrop-test.component.scss']
})
export class DraganddropTESTComponent implements OnInit {

  availableProducts: Candidat[];

  selectedProducts: Candidat[];

  draggedProduct: Candidat;
  candidats: Candidat[] = [];
  candidat: Candidat;
  selectedCandidat: Candidat[];


  availableBooks: Candidat[];

  favoriteBooks: Candidat[];

  draggedBook: Candidat;




  constructor(private candidatService: CandidatService,
              private productService: ProductService) { }

  ngOnInit() {
    this.selectedProducts = [];
    // this.productService.getProductsSmall().then(products => this.availableProducts = products);
    this.candidats=JSON.parse(localStorage["candidatsCache"] || "[]");
    if(this.candidats.length==0){
      this.findAll();
      this.candidatService.getAllCache();
    }
    console.log(this.candidats);
  }

  public findAll() {
    this.candidatService.getAll()
      .subscribe(data => {
        this.candidats = data;
      }, err => {
        console.log(err);
      });
  }


  // dragStart(candidat: Candidat) {
  //   this.draggedProduct = candidat;
  // }
  //
  // drop() {
  //   if (this.draggedProduct) {
  //     let draggedProductIndex = this.findIndex(this.draggedProduct);
  //     this.selectedProducts = [...this.selectedProducts, this.draggedProduct];
  //     this.availableProducts = this.availableProducts.filter((val,i) => i!=draggedProductIndex);
  //     this.draggedProduct = null;
  //   }
  // }
  //
  // dragEnd() {
  //   this.draggedProduct = null;
  // }
  //
  // findIndex(candidat: Candidat) {
  //   let index = -1;
  //   for (let i = 0; i < this.availableProducts.length; i++) {
  //     if (candidat.id === this.availableProducts[i].id) {
  //       index = i;
  //       break;
  //     }
  //   }
  //   return index;
  // }

  dragStart(event, book: Candidat) {
    this.draggedBook = book;
  }
  drop(event) {
    if (this.draggedBook) {
      let draggedBookIndex = this.findIndex(this.draggedBook);
      this.favoriteBooks = [...this.favoriteBooks, this.draggedBook];
      this.availableBooks = this.availableBooks.filter((val, i) => i != draggedBookIndex);
      this.draggedBook = null;
    }
  }

  dragEnd(event) {
    this.draggedBook = null;
  }

  findIndex(book: Candidat) {
    let index = -1;
    for (let i = 0; i < this.availableBooks.length; i++) {
      if (book.id === this.availableBooks[i].id) {
        index = i;
        break;
      }
    }
    return index;
  }

}
