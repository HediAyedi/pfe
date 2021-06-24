import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CandidatureService } from 'src/app/api/candidature.service';
import { CritiqueService } from 'src/app/api/critique.service';
import { Candidature } from 'src/app/models/candidature';
import { Critique } from 'src/app/models/critique';
import { ActivatedRoute } from '@angular/router';
import { Candidat } from 'src/app/models/candidat';

@Component({
  selector: 'app-candidatures',
  templateUrl: './candidatures.component.html',
  styleUrls: ['./candidatures.component.scss']
})
export class CandidaturesComponent implements OnInit {
  candidatures: Candidature[] = [];
  not_selected_candidatures: Candidature[] = [];
  selected_candidatures: Candidature[] = [];
  in_review_candidatures: Candidature[] = [];
  accepted_candidatures: Candidature[] = [];
  rejected_candidatures: Candidature[] = [];


  add_critique = new Critique();
  idRoute: any;

  displayed_candidat= new Candidat();
  displayed_candidature = new Candidature();
  displayed: boolean;
  cv_base64: any;

  constructor(
    private candidatureService: CandidatureService,
    private route: ActivatedRoute,
    private critiqueService: CritiqueService) { }

  ngOnInit() {
    this.idRoute = this.route.snapshot.paramMap.get('offre_id');
    this.findAllbyId(this.idRoute);

  }

  findAllbyId(id) {
    this.candidatureService.getAllById(id).subscribe(
      (data) => {
        this.candidatures = data;
        this.not_selected_candidatures = [];
        this.selected_candidatures = [];
        this.in_review_candidatures = [];
        this.accepted_candidatures = [];
        this.rejected_candidatures = [];

        this.candidatures.forEach(candidature => {
          
          if (candidature.status == 'not_selected') {
            this.not_selected_candidatures.push(candidature);
          }
          else if (candidature.status == 'selected') {
            this.selected_candidatures.push(candidature);
          }
          else if (candidature.status == 'in_review') {
            this.in_review_candidatures.push(candidature);
          }
          else if (candidature.status == 'accepted') {
            this.accepted_candidatures.push(candidature);
          }
          else if (candidature.status == 'rejected') {
            this.rejected_candidatures.push(candidature);
          }
        });

      },
      (err) => {
        console.log(err);
      }
    );
  }



  // base64ToBlob(b64Data, contentType='', sliceSize=512) {

  //   b64Data = b64Data.replace(/\s/g, ''); //IE compatibility...

  //   let byteCharacters = atob(b64Data);
  //   let byteArrays = [];
  //   for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
  //       let slice = byteCharacters.slice(offset, offset + sliceSize);
  //       let byteNumbers = new Array(slice.length);
  //       for (var i = 0; i < slice.length; i++) {
  //           byteNumbers[i] = slice.charCodeAt(i);
  //       }
  //       let byteArray = new Uint8Array(byteNumbers);
  //       byteArrays.push(byteArray);
  //   }
  //   return new Blob(byteArrays, {type: contentType});
  // }

  dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'application/pdf' });
    console.log("CV inside: ", blob);
    return blob;
  }

  public edit(candidature) {
    this.candidatureService.update(candidature, candidature.id).subscribe(
      (data) => {
        console.log("Edited", data);
      },
      (err) => {
        console.log(err);
      }
    );
  }


  drop(event: CdkDragDrop<string[]>) {

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }

    else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);

      this.selected_candidatures.forEach(candidature => {
        if (candidature.status != 'selected') {
          candidature.status = 'selected';
          this.edit(candidature);
        }
      });
      this.not_selected_candidatures.forEach(candidature => {
        if (candidature.status != 'not_selected') {
          candidature.status = 'not_selected';
          this.edit(candidature);
        }
      });
      this.in_review_candidatures.forEach(candidature => {
        if (candidature.status != 'in_review') {
          candidature.status = 'in_review';
          this.edit(candidature);
        }
      });
      this.accepted_candidatures.forEach(candidature => {
        if (candidature.status != 'accepted') {
          candidature.status = 'accepted';
          this.edit(candidature);
        }
      });
      this.rejected_candidatures.forEach(candidature => {
        if (candidature.status != 'rejected') {
          candidature.status = 'rejected';
          this.edit(candidature);
        }
      });
    }
  }


  //Shows the candidat modal
  CandidatDialog(candidature : Candidature) {
    this.displayed_candidat = candidature.candidat;
    
    var modal = document.getElementById('candidatModal');
    modal.style.display = 'block';
  }

  //Hides the candidat modal
  CandidatCancel() {
    this.displayed_candidat= new Candidat();
    var modal = document.getElementById('candidatModal');
    modal.style.display = 'none';
  }

  //Shows the candidature modal
  CandidatureDialog(candidature) {
    this.displayed = true;
    this.displayed_candidature = candidature;

    this.cv_base64=this.displayed_candidature.cv;
    
    var modal = document.getElementById('candidatureModal');
    modal.style.display = 'block';
  }

  //Hides the candidature modal
  CandidatureCancel() {
    this.displayed = false;
    var modal = document.getElementById('candidatureModal');
    modal.style.display = 'none';
  }

  //Shows the form modal
  CritiqueDialog(candidature) {
    this.add_critique.candidature_id = candidature.id;
    this.add_critique.candidat_id=candidature.candidat_id;
    var modal = document.getElementById('critiqueForm');
    modal.style.display = 'block';
  }

  //Hides the form modal
  CritiqueCancel() {
    var modal = document.getElementById('critiqueForm');
    modal.style.display = 'none';
    this.add_critique = new Critique();
  }

  AddCritique(critique) {
    console.log(critique);
    this.critiqueService.save(critique).subscribe(res => {
      console.log(res);
      this.findAllbyId(this.idRoute);
      this.CritiqueCancel();
    });
  }


}
