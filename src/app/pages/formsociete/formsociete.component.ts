import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formsociete',
  templateUrl: './formsociete.component.html',
  styleUrls: ['./formsociete.component.css']
})
export class FormsocieteComponent implements OnInit {
  selectedState: any = null;

  states: any[] = [
    { name: 'Tunis', code: 'Tunis' },
    { name: 'Sfax', value: 'Sfax' },
    { name: 'Ariana', code: 'Ariana' },
    { name: 'Sousse', code: 'Sousse' },
    { name: 'Kairouan', code: 'Kairouan' }
  ];

  cities1: any[] = [];

  cities2: any[] = [];

  city1: any = null;

  city2: any = null;
  constructor() { }

  ngOnInit(): void {
  }

}
