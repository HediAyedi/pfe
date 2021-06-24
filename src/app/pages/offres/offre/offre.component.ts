import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Offre } from '../../../models/offre';
import { Candidature } from '../../../models/candidature';
import { OffreService } from '../../../api/offres.service';
import { TopOffreService } from '../../../api/top-offre.service';
import { CandidatureService } from '../../../api/candidature.service';
import { Candidat } from 'src/app/models/candidat';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from "rxjs/operators";
@Component({
  selector: 'app-offre',
  templateUrl: './offre.component.html',
  styleUrls: ['./offre.component.css']
})
export class OffreComponent implements OnInit {

  // Injecting the offre object to minimize the waitingg time for the user //
  @Input() offre: Offre;
  top_offres = [];
  back_offres: Offre[]= [];

  ngOnChanges(changes: SimpleChanges) {
    this.offre = changes.offre.currentValue;
    console.log(this.offre);
  }


  offres: Offre[] = [];
  candidature = new Candidature();
  candidat: Candidat;
  postulated_candidat = false;

  fileToUpload: File = null;

  postulation_loading=false;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private offreService: OffreService,
    private top_offreService: TopOffreService,
    private candidatureService: CandidatureService,
    private storage: AngularFireStorage,
    ) { }

  ngOnInit(): void {

    this.candidat = JSON.parse(localStorage.getItem('candidat'));
    this.findOffre(this.offre.id);
    this.scrollTop();
  }

  scrollTop() {
    document.body.scrollTop = 0;
    window.scroll(0,0);
    document.querySelector('body').scrollTo(0,0);
  }

  handleFileInput(files: FileList) {

    const reader = new FileReader();
    reader.onload = () => {
      //this.candidature.cv=reader.result;
      console.log(reader.result);
    };
    reader.readAsDataURL(files[0]);
    this.fileToUpload = files[0];

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

  //navigates to the candidate login page
  connect() {
    this.router.navigate(['/loginCandidat'])
  }
  postulate() {
    this.postulation_loading=true;
    let datenow = new Date();
    var pathcv = "/cv/" + datenow + '_cv.pdf';

    const fileref = this.storage.ref(pathcv);
    this.storage
      .upload(pathcv, this.fileToUpload, {
        contentType: 'application/pdf'
      })
      .snapshotChanges()
      .pipe(
        finalize(() => {
          fileref.getDownloadURL().subscribe((url) => {
            this.candidature.cv = url;
            console.log(url);

            this.candidature.emploi_id = this.offre.id;
            this.candidature.candidat_id = this.candidat.id;
            this.candidatureService.save(this.candidature).subscribe(
              res => {
                // Works inside modal or own page 
                this.findOffre(this.offre.id);
                this.cancel();
                this.postulation_loading=false;

              }, err => {
                console.log(err);
                this.postulation_loading=false;
              }
            )
          });
        })
      )
      .subscribe();

  }

  //Methode pour determiner si le candidat a postulé pour cette offre
  postulated(offre) {
    console.log("chekking posulation", offre);
    if (this.candidat) {
      if (offre.candidatures.length > 0) {
        offre.candidatures.forEach(candidature => {
          if (candidature.candidat_id == this.candidat.id) {
            this.postulated_candidat = true;
            sessionStorage.setItem('postulated', JSON.stringify(this.postulated_candidat));
          }
          else {
            this.postulated_candidat = false;
            sessionStorage.setItem('postulated', JSON.stringify(this.postulated_candidat));
          }
        })
      }
      else {
        this.postulated_candidat = false;
        sessionStorage.setItem('postulated', JSON.stringify(this.postulated_candidat));
      }
    }
    else {
      this.postulated_candidat = false;
      sessionStorage.setItem('postulated', JSON.stringify(this.postulated_candidat));
    }
  }

  public findOffre(id) {
    this.offreService.get(id).subscribe(data => {
      this.offre = data;
      this.findTopOffre(this.offre.id);
      this.postulated(this.offre);
    });
  }

  // revealing suggestion details
  suggest(offre) {
    this.back_offres.push(this.offre);
    this.offre=null;
    
    this.findOffre(offre.id);
  }

  //going back to the original offre
  /* WORKS ONLY ONE TIME*/
  back() {
    this.offre=null;

    this.findOffre(this.back_offres[this.back_offres.length-1].id);
    this.back_offres.pop();
  }

  findTopOffre(id) {
    this.top_offres = [];
    this.top_offreService.getById(id).subscribe(data => {
      if (data) {
        if (data.top1) {
          this.offreService.get(data.top1).subscribe(res => {
            this.top_offres.push(res);

            if (data.top2) {
              this.offreService.get(data.top2).subscribe(res => {
                this.top_offres.push(res);

                if (data.top3) {
                  this.offreService.get(data.top3).subscribe(res => {
                    this.top_offres.push(res);
                  });
                }
              });
            }
          });
        }
      }
    }
    , err => {
      console.log(err)
    })
  }
}
