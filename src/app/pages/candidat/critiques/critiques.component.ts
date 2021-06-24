import { Component, OnInit } from '@angular/core';
import { CritiqueService } from 'src/app/api/critique.service';
import { Candidat } from 'src/app/models/candidat';
import { Critique } from 'src/app/models/critique';

@Component({
  selector: 'app-critiques',
  templateUrl: './critiques.component.html',
  styleUrls: ['./critiques.component.css']
})
export class CritiquesComponent implements OnInit {
  critiques: Critique[]=[];
  candidat:Candidat;
  loading=false;
  constructor(
    private critiqueService: CritiqueService,
  ) { }

  ngOnInit(): void {
    this.candidat=JSON.parse(localStorage.getItem('candidat'));
    this.findCritiques(this.candidat.id);
  }

  findCritiques(id){
    this.loading=true;
    this.critiqueService.getAll(id).subscribe(res=>{
      this.loading=false;
      this.critiques=res;
    },err=>{
      console.log(err);
      this.loading=false;
    });
  }
  updateCritique(critique){
    this.critiqueService.update(critique,critique.id).subscribe(res=>{
      console.log(res)
    },err=>{
      console.log(err);
    });
  }
}
