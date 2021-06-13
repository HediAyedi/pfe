import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { CandidatService } from 'src/app/api/candidat.service';
import { Candidat } from 'src/app/models/candidat';

@Component({
  selector: 'app-candidat-profile',
  templateUrl: './candidat-profile.component.html',
  styleUrls: ['./candidat-profile.component.css']
})
export class CandidatProfileComponent implements OnInit {

  constructor(
    private candidatService:  CandidatService,) { }

  // Injecting the offre object to minimize the waitingg time for the user //
  @Input() candidat = new Candidat() ;

  ngOnChanges(changes: SimpleChanges) {
    
    this.candidat=changes.candidat.currentValue;
    console.log(this.candidat);

  }
  
  ngOnInit(): void {
    this.findCandidatById(this.candidat.id);

  }

  findCandidatById(id){
    this.candidatService.get(id).subscribe(res=>{
      this.candidat=res;
      console.log("The second BOI",this.candidat);
    })
  }

}
