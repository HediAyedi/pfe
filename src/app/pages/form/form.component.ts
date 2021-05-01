import { Component, OnInit , ViewEncapsulation} from '@angular/core';
import {MessageService} from 'primeng/api';
import {MenuItem} from 'primeng/api';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  providers: [MessageService],
  styles: [`
        .ui-steps .ui-steps-item {
            width: 25%;
        }
        
        .ui-steps.steps-custom {
            margin-bottom: 30px;
          
        }
        
        .ui-steps.steps-custom .ui-steps-item .ui-menuitem-link {
            padding: 0 1em;
            overflow: visible;
        }
        
        .ui-steps.steps-custom .ui-steps-item .ui-steps-number {
            background-color: #0081c2;
            color: #FFFFFF;
            display: inline-block;
            width: 36px;
            border-radius: 50%;
            margin-top: -14px;
            margin-bottom: 10px;
        }
        
        .ui-steps.steps-custom .ui-steps-item .ui-steps-title {
            color: #555555;
        }
    .box{
      background-color: white;
      width: auto;
      height: auto;
      padding-bottom: 50px;
    }
    .box2{
      background-color: white;
      margin-top: 50px;
      width: auto;
      height: 250px;
    }
    `],
  encapsulation: ViewEncapsulation.None

})
export class FormComponent implements OnInit {


  items: MenuItem[];
  activeIndex: number = 1;



  constructor(private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.items = [{
      label: 'Personal',
      command: (event: any) => {
        this.activeIndex = 0;
        this.messageService.add({severity:'info', summary:'First Step', detail: event.item.label});
      }
    },
      {
        label: 'Seat',
        command: (event: any) => {
          this.activeIndex = 1;
          this.messageService.add({severity:'info', summary:'Seat Selection', detail: event.item.label});
        }
      },
      {
        label: 'Payment',
        command: (event: any) => {
          this.activeIndex = 2;
          this.messageService.add({severity:'info', summary:'Pay with CC', detail: event.item.label});
        }
      },
      {
        label: 'Confirmation',
        command: (event: any) => {
          this.activeIndex = 3;
          this.messageService.add({severity:'info', summary:'Last Step', detail: event.item.label});
        }
      }
    ];
  }

}

