import { Component, OnInit } from '@angular/core';
import {Blog} from '../../models/blog';
import {BlogService} from '../../api/blog.service';

@Component({
  selector: 'app-blog-home',
  templateUrl: './blog-home.component.html',
  styleUrls: ['./blog-home.component.css']
})
export class BlogHomeComponent implements OnInit {

  blogs: Blog[]=[];

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.blogs=JSON.parse(localStorage["blogsCache"] || "[]");
    this.findAll()
  }
  public findAll() {
    this.blogService.getAll()
      .subscribe(data => {
        this.blogs = data;
        localStorage.setItem("blogsCache", JSON.stringify(data));
      }, err => {
        console.log(err);
      });
  }
}
