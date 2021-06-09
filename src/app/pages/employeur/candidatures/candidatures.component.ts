import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CandidatureService } from 'src/app/api/candidature.service';
import { Candidature } from 'src/app/models/candidature';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-candidatures',
  templateUrl: './candidatures.component.html',
  styleUrls: ['./candidatures.component.scss']
})
export class CandidaturesComponent implements OnInit {
  candidatures: Candidature[]=[];
  not_selected_candidatures: Candidature[]=[];
  selected_candidatures: Candidature[]=[];
  in_review_candidatures: Candidature[]=[];
  accepted_candidatures: Candidature[]=[];
  rejected_candidatures: Candidature[]=[];
  idRoute: any;

  constructor(private candidatureService : CandidatureService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.idRoute = this.route.snapshot.paramMap.get('offre_id');
    this.findAllbyId(this.idRoute);
  }
  
  public findAllbyId(id) {
    this.candidatureService.getAllById(id).subscribe(
      (data) => {
        this.candidatures = data;
        this.candidatures.forEach(Candidature=>{
          if(Candidature.status=='not_selected'){
            this.not_selected_candidatures.push(Candidature);
          }
          else if(Candidature.status=='selected'){
            this.selected_candidatures.push(Candidature);
          }
          else if(Candidature.status=='in_review'){
            this.in_review_candidatures.push(Candidature);
          }
          else if(Candidature.status=='accepted'){
            this.accepted_candidatures.push(Candidature);
          }
          else if(Candidature.status=='rejected'){
            this.rejected_candidatures.push(Candidature);
          }
        });
        console.log("From backend: ",this.candidatures);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  public edit(candidature) {
    this.candidatureService.update(candidature,candidature.id).subscribe(
      (data) => {
        console.log("Edited",data);
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
        
        this.selected_candidatures.forEach(candidature=>{
          if(candidature.status!='selected'){
            candidature.status='selected';
            this.edit(candidature);
          }
        });
        this.not_selected_candidatures.forEach(candidature=>{
          if(candidature.status!='not_selected'){
            candidature.status='not_selected';
            this.edit(candidature);
          }
        });
        this.in_review_candidatures.forEach(candidature=>{
          if(candidature.status!='in_review'){
            candidature.status='in_review';
            this.edit(candidature);
          }
        });
        this.accepted_candidatures.forEach(candidature=>{
          if(candidature.status!='accepted'){
            candidature.status='accepted';
            this.edit(candidature);
          }
        });
        this.rejected_candidatures.forEach(candidature=>{
          if(candidature.status!='rejected'){
            candidature.status='rejected';
            this.edit(candidature);
          }
        });
    }
  }


}
