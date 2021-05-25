import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { TestService } from "../../api/test.service"

@Component({
  selector: 'app-gestion-cv',
  templateUrl: './gestion-cv.component.html',
  styleUrls: ['./gestion-cv.component.css'],
})
export class GestionCvComponent implements OnInit {
  items: MenuItem[];

  subscription: Subscription;

  constructor(
    public messageService: MessageService,
    public testService:TestService
  ) {}

  ngOnInit(): void {
    this.items = [
      {
        label: 'Personal',
        routerLink: 'personal',
      },
      {
        label: 'Seat',
        routerLink: 'seat',
      },
      {
        label: 'Payment',
        routerLink: 'payment',
      },
      {
        label: 'Confirmation',
        routerLink: 'confirmation',
      },
    ];
    
}


}
