import { Component, OnInit } from '@angular/core';
import {Blog} from '../../models/blog';
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

  blog= new Blog();
  message: any;
  editing=false
  blogs: Blog[];
  first = 0;

  rows = 5;

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }



  constructor(private blogService: BlogService,
              private messageService: MessageService,
              private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {


    this.blogs=JSON.parse(localStorage["blogsCache"] || "[]");
    this.primengConfig.ripple = true;
    this.findAll();

  }

  //Shows the form modal
  showDialog(){
    var modal = document.getElementById("blogForm");
    modal.style.display = "block";
  }

  //Hides the form modal
  cancel(){
    var modal = document.getElementById("blogForm");
    modal.style.display = "none";
    this.blog = new Blog();
    this.editing=false;
  }

  showEditDialog(blog){
    this.showDialog();
    this.blog= blog;
    this.editing=true;
  }

  showSuccess() {
    this.messageService.add({severity: 'success', summary: 'Success', detail: this.message});
  }

  public findAll() {
    this.blogService.getAll()
      .subscribe(data => {
        this.blogs = data;
        localStorage.setItem("blogsCache",JSON.stringify(data));
      }, err => {
        console.log(err);
      });
  }

  add() {
    // console.log('blog:', this.blog);
    // console.log('Image:', this.filedata);
    this.blogService.save(this.blog).subscribe(res => {
          this.findAll();
          this.cancel();
      }, err => {
        this.message = err.error.message;

      }
    );
  }

  edit() {
    // console.log('blog:', this.blog);
    // console.log('Image:', this.filedata);
    this.blogService.update(this.blog, this.blog.id).subscribe(res => {
          this.findAll();
          this.cancel();
      }, err => {
        this.message = err.error.message;

      }
    );
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

