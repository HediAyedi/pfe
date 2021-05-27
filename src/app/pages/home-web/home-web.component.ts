import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home-web',
  templateUrl: './home-web.component.html',
  styleUrls: ['./home-web.component.css']
})
export class HomeWebComponent implements OnInit {

  TweenMax: any;

  constructor(private router: Router) { }
  @ViewChild('title') box: ElementRef;

  ngOnInit(): void {

  }
  route(){
    this.router.navigate(['/offres']);
  }
}
