import { Component, OnInit } from '@angular/core';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import {PrimeNGConfig} from "primeng/api";
@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css'],
  styles: [`
        :host ::ng-deep button {
            margin-right: .5em;
        }
    `]
})
export class CvComponent implements OnInit {
  visibleSidebar3;
  color2: string = "#0bb5f4";
  color3 : string = "#b1eaff";
  constructor(private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;

  }
  download(){
    var element = document.getElementById('cv');
    html2canvas(element).then((canvas) => {
      console.log(canvas);
      var imgData = canvas.toDataURL('image/png');
      var doc = new jspdf();
      var imgHeight = canvas.height * 180 / canvas.width;
      doc.addImage(imgData, 0, 0, 210, imgHeight);
      doc.save("mon cv.pdf");
    });
  }
}
