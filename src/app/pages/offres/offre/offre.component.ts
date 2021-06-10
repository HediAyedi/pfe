import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Offre} from '../../../models/offre';
import {Candidature} from '../../../models/candidature';
import {OffreService} from '../../../api/offres.service';
import {CandidatureService} from '../../../api/candidature.service';
import { Candidat } from 'src/app/models/candidat';

@Component({
  selector: 'app-offre',
  templateUrl: './offre.component.html',
  styleUrls: ['./offre.component.css']
})
export class OffreComponent implements OnInit {

   

  idRoute: any;
  offre: Offre = new Offre() ;
  offres: Offre[] = [] ;
  candidature=new Candidature();
  candidat: Candidat;
  postulated_candidat= false;

  
  constructor(private route: ActivatedRoute,
    private router: Router,
    private offreService: OffreService,
    private candidatureService: CandidatureService) { }

  ngOnInit(): void {
    this.idRoute = this.route.snapshot.paramMap.get('offre_id');
    this.offre=JSON.parse(sessionStorage.getItem('offre'));
    this.candidat=JSON.parse(localStorage.getItem('candidat'));
    this.postulated_candidat=JSON.parse(sessionStorage.getItem('postulated'));

  }

  
  //Shows the modal
  showDialog() {
    
    var modal = document.getElementById('PostulationModal');
    modal.style.display = 'block';
  }

  //hides the modal
  cancel() {
    var modal = document.getElementById('PostulationModal');
    modal.style.display = 'none';
  }

  //
  connect(){
    this.router.navigate(['/loginCandidat'])
  }
  postulate(){
    this.candidature.emploi_id=this.offre.id;
    this.candidature.candidat_id=this.candidat.id;
    this.candidatureService.save(this.candidature).subscribe(
      res=>{
        // Works inside modal or own page 
        this.findOffre(this.offre.id);
        this.postulated_candidat=true;
        sessionStorage.setItem('postulated',JSON.stringify(this.postulated_candidat));
        this.cancel();

      },err=>{
        console.log(err);
      }
    )
  }

  
  public findOffre(id){
    this.offreService.get(id).subscribe(data=>{
      this.offre=data;
      sessionStorage.setItem('offre',JSON.stringify(this.offre));
    })
  }
}
