import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {Power1, Bounce, Expo} from 'gsap/all';

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

    this.TweenMax.from(this.box.nativeElement , 1 , {
      delay: 5,
      opacity: 0,
      y: -800,
      ease : Expo.easeInOut
    });

    this.TweenMax.from('.leaves .layer:nth-child(1)' , 2 , {
      delay: 2,
      opacity: 0,
      y: -800,
      ease : Expo.easeInOut
    });

    this.TweenMax.from('.leaves .layer:nth-child(2)' , 2 , {
      delay: 2.1,
      opacity: 0,
      y: -800,
      ease : Expo.easeInOut
    });

    this.TweenMax.from('.leaves .layer:nth-child(3)' , 2 , {
      delay: 2.2,
      opacity: 0,
      y: -800,
      ease : Expo.easeInOut
    });

    this.TweenMax.from('.leaves .layer:nth-child(4)' , 2 , {
      delay: 2.3,
      opacity: 0,
      y: -800,
      ease : Expo.easeInOut
    });
    this.TweenMax.from('.leaves .layer:nth-child(5)' , 2 , {
      delay: 2.4,
      opacity: 0,
      y: -800,
      ease : Expo.easeInOut
    });
    this.TweenMax.from('.title' , 1 , {
      delay: 1,
      opacity: 0,
      y: 20,
      ease : Expo.easeInOut
    });

    this.TweenMax.from('.tagline' , 1 , {
      delay: 1.3,
      opacity: 0,
      y: 20,
      ease : Expo.easeInOut
    });

    this.TweenMax.from('.pages' , 1 , {
      delay: 1.3,
      opacity: 0,
      y: 20,
      ease : Expo.easeInOut
    });

    this.TweenMax.from('.more' , 1 , {
      delay: 1.4,
      opacity: 0,
      y: 20,
      ease : Expo.easeInOut
    });
    this.TweenMax.from('.desc' , 1 , {
      delay: 1.4,
      opacity: 0,
      y: 20,
      ease : Expo.easeInOut
    });

    this.TweenMax.from('.arrows' , 1 , {
      delay: 2,
      opacity: 0,
      ease : Expo.easeInOut
    });



  }
  route(){
    this.router.navigate(['/offres']);
  }
}
