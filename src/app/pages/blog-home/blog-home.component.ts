import { Component, OnInit } from '@angular/core';
import {Blog} from '../../models/blog';
import {BlogService} from '../../api/blog.service';

@Component({
  selector: 'app-blog-home',
  templateUrl: './blog-home.component.html',
  styleUrls: ['./blog-home.component.css']
})
export class BlogHomeComponent implements OnInit {

  blog: Blog[];

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.findAll()
  }
  public findAll() {
    this.blogService.getAll()
      .subscribe(data => {
        this.blog = data;
      }, err => {
        console.log(err);
      });
  }
}
