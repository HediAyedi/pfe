import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  

  constructor(
    
    private router: Router,
    ) {

     
  }

  // public findEmployeurs(){
  //   this.employeurService.getAllCache();
  // }
  // public findCandidats() {
  //   this.candidatService.getAllCache();
  // }
  // public findOffres() {
  //   this.offreService.getAllCache();
  // }
  title = 'KamJobs';

  isAdmin() {
    return this.router.url.includes("/admin");
}

  isEmployeur() {
    return this.router.url.includes("/employeur");
  }
}
