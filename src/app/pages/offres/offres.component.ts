import { Component, OnInit, Input } from '@angular/core';
import { PrimeNGConfig, SelectItem } from 'primeng/api';
import { OffreService } from '../../api/offres.service';
import { Offre } from '../../models/offre';
import { Langue } from 'src/app/models/Langue';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offres',
  templateUrl: './offres.component.html',
  styleUrls: ['./offres.component.css'],
})
export class OffresComponent implements OnInit {
  // First page number declaration
  page = 1;
  //Filter value
  term: string;

  langues: Langue[];
  offres: Offre[] = [];

  //Boolean value to minimize errors in the offre modal
  clicked=false;

  //Input from employeurs page 
  @Input() items = null;


  constructor(
    private primengConfig: PrimeNGConfig,
    private offreService: OffreService,
    private router: Router
  ) {}

  ngOnInit(): void {
    
    //In case you logged/signed as a candidate after being prompted to login from the offre modal
    if(JSON.parse(sessionStorage.getItem('connected'))){
      var selectedOffre=JSON.parse(sessionStorage.getItem('offre'));
    if (selectedOffre){
      this.showDialog(selectedOffre);
    }
    }
    if (!this.router.url.includes("/offres")){
      this.offres=this.items;
      console.log("YUUUP: ",this.offres);
    }
    else{
      this.offres = JSON.parse(localStorage.offresCache || '[]');
      this.findAll();
    }
    this.langues = JSON.parse(localStorage.languesCache || '[]');
    this.primengConfig.ripple = true;
  }

  public findAll() {
    this.offreService.getAll().subscribe(
      (data) => {
        this.offres = data;
        localStorage.setItem('offresCache', JSON.stringify(data));
      },
      (err) => {
        console.log(err);
      }
    );
  }
  route(offre) {
    sessionStorage.setItem('offre',JSON.stringify(offre))
    this.router.navigate(['/offre', offre.id]);
  }

  //Shows the modal
  showDialog(offre) {
    this.clicked=true
    sessionStorage.setItem('offre',JSON.stringify(offre))
    var modal = document.getElementById('offreModal');
    modal.style.display = 'block';
  }

  //hides the modal
  cancel() {
    this.clicked=false;
    sessionStorage.removeItem('offre');
    var modal = document.getElementById('offreModal');
    modal.style.display = 'none';
  }
}
