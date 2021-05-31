import { Component, OnInit } from '@angular/core';
import {Blog} from '../../models/blog';
import {CandidatService} from '../../api/candidat.service';
import {MessageService, PrimeNGConfig} from 'primeng/api';
import {BlogService} from '../../api/blog.service';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styles: [`
        :host ::ng-deep .p-cell-editing {
            padding-top: 0 !important;
            padding-bottom: 0 !important;
        }
    `],
  styleUrls: ['./blog-form.component.css']
})
export class BlogFormComponent implements OnInit {

  blog: Blog = new Blog();
  message: any;
  display=false
  blog2: Blog[];
  first = 0;
  displayPosition = false;

  position: string;


  rows = 10;

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  clonedProducts: { [s: string]: Blog; } = {};

  constructor(private blogService: BlogService,
              private messageService: MessageService,
              private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {
    this.blog2=JSON.parse(localStorage["blogsCache"] || "[]");
    this.primengConfig.ripple = true;
    this.findAll();

  }

  showPositionDialog(position: string) {
    this.position = position;
    this.displayPosition = true;
  }

  showSuccess() {
    this.messageService.add({severity: 'success', summary: 'Success', detail: this.message});
  }
  ajouter() {

    // console.log('blog:', this.blog);
    // console.log('Image:', this.filedata);
    this.blogService.save(this.blog).subscribe(res => {
        
          this.findAll();
          this.display=true;
      }, err => {
        this.message = err.error.message;
        this.findAll();

      }
    );
  }

  onRowEditInit(blog: Blog, id: number) {
    this.clonedProducts[blog.id] = {...blog};
    // this.blogService.update(blog, blog.id)
    //   .subscribe(res => {
    //     if (!res.succes) {
    //       this.message="modification effectué avec succés";
    //       // this.employeurService.getAllCache();
    //     } else {
    //       this.message="erreuuur";
    //     }
    //   }, err => {
    //     this.message = 'not effected'
    //   } ) ;
  }

  public findAll() {
    this.blogService.getAll()
      .subscribe(data => {
        this.blog2 = data;
      }, err => {
        console.log(err);
      });
  }

  onRowEditSave(blog: Blog,id: number) {
this.blogService.update(blog, id)
      .subscribe(res => {
        if (!res.succes) {
          this.message="modification effectué avec succés";
          // this.employeurService.getAllCache();
        } else {
          this.message="erreuuur";
        }
      }, err => {
        this.message = 'not effected'
      } ) ;
    }

  onRowEditCancel(blog: Blog, index: number) {
    this.blog2[index] = this.clonedProducts[blog.id];
    delete this.clonedProducts[blog.id];
  }
  delete(id:number){
    this.blogService.delete(id).subscribe(res => {
      if (!res.succes) {
        this.message="modification effectué avec succés";
        this.findAll();
        // this.employeurService.getAllCache();
      } else {
        this.message="erreuuur";
        this.findAll();

      }
    }, err => {
      this.message = 'not effected';
      this.findAll();

    } ) ;
  };

  }

