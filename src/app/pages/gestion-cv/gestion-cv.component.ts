import { Component, OnInit , ViewEncapsulation} from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { TestService } from "../../api/test.service"

@Component({
  selector: 'app-gestion-cv',
  templateUrl: './gestion-cv.component.html',
  styleUrls: ['./gestion-cv.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GestionCvComponent implements OnInit {

  items: MenuItem[];
  activeIndex: number = 1;

  constructor(
    public messageService: MessageService,
    public testService:TestService
  ) {}

  ngOnInit(): void {
    this.items = [
      {
        label: 'Personal info',
        routerLink: 'personal',
      },
      {
        label: 'Professional info',
        routerLink: 'professional',
      },
      {
        label: 'Experiences',
        routerLink: 'experiences',
      },
    ];
    
}


}
