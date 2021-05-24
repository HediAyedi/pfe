import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Offre} from '../../../models/offre';
import {OffreService} from '../../../api/offres.service';

@Component({
  selector: 'app-offre',
  templateUrl: './offre.component.html',
  styleUrls: ['./offre.component.css']
})
export class OffreComponent implements OnInit {

  idRoute: any;
  offre: Offre = new Offre() ;
  offres: Offre[] = [] ;
  constructor(private route: ActivatedRoute,
              private offreService: OffreService) { }

  ngOnInit(): void {
    this.idRoute = this.route.snapshot.paramMap.get('offre_id');
    this.findAll();
    this.findOffre()

    // this.offre = this.offres.filter(
    //     off => off.id === this.idRoute
    //   ) ;


  }

  public findOffre(){
    this.offreService.get(this.idRoute).subscribe(data=>{
      this.offre=data;
    })
  }

  public findAll() {
    this.offreService.getAll()
      .subscribe(data => {
        this.offres = data;
        console.log(this.offres) ;

        // this.offre = this.offres.filter(
        //   off => off.id === this.idRoute
        // ) ;

        // console.log(this.offres);


        // console.log("data :::: :: :: :" , data);
        // console.log("offffffffffres:::: :: :: :" , JSON.parse(String(this.offre.id)));

        // console.log(this.offres);
      }, err => {
        console.log(err);
      });
  }

}
