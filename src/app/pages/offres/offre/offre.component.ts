import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
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

  // Injecting the offre object to minimize the waitingg time for the user //
  @Input() offre = new Offre() ;

  ngOnChanges(changes: SimpleChanges) {
    this.offre=changes.offre.currentValue;
    console.log(this.offre);

  }
  
  
  offres: Offre[] = [] ;
  candidature=new Candidature();
  candidat: Candidat;
  postulated_candidat= false;

  fileToUpload: File = null;
  
  constructor(private route: ActivatedRoute,
    private router: Router,
    private offreService: OffreService,
    private candidatureService: CandidatureService) { }

  ngOnInit(): void {
    
    this.candidat=JSON.parse(localStorage.getItem('candidat'));
    this.findOffre(this.offre.id);

  }


  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    const reader = new FileReader();
    reader.readAsDataURL(this.fileToUpload);
    reader.onload = () => {
        this.candidature.cv=reader.result;
        console.log(this.candidature.cv);
    };

    // const reader = new FileReader();
    // reader.readAsDataURL(this.fileToUpload);
    // reader.onload = () => {
    //   let encoded = reader.result.toString().replace("data:", "").replace(/^.*;base64,/, "");
    //   if ((encoded.length % 4) > 0) {
    //     encoded += '='.repeat(4 - (encoded.length % 4));
    //   }
    //   this.candidature.cv=reader.result;
    //   console.log(this.candidature.cv);
    // };
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
        this.cancel();

      },err=>{
        console.log(err);
      }
    )
  }

  //Methode pour determiner si le candidat a postulé pour cette offre
  postulated(offre){
    console.log("chekking posulation",offre);
    if(this.candidat){
      if(offre.candidatures.length>0){
        offre.candidatures.forEach(candidature=>{
          if(candidature.candidat_id == this.candidat.id){
            this.postulated_candidat=true;
            sessionStorage.setItem('postulated',JSON.stringify(this.postulated_candidat));
          }
          else{
            this.postulated_candidat=false;
            sessionStorage.setItem('postulated',JSON.stringify(this.postulated_candidat));
          }
        })
      }
      else{
        this.postulated_candidat=false;
        sessionStorage.setItem('postulated',JSON.stringify(this.postulated_candidat));
      }
    }
    else{
      this.postulated_candidat=false;
      sessionStorage.setItem('postulated',JSON.stringify(this.postulated_candidat));
    }
  }
  
  public findOffre(id){
    this.offreService.get(id).subscribe(data=>{
      this.offre=data;
      this.postulated(this.offre);
    })
  }
}
