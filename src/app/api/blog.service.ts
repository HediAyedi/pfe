import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Adresse} from '../models/adresse';
import {Blog} from '../models/blog';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private url = environment.baseUrl;
  constructor(private httpClient: HttpClient) { }

  public getAll(): Observable<Blog[]> {
    return this.httpClient.get<Blog[]>(this.url + '/blogs');
  }

  public getAllCache(){
    this.httpClient.get<Blog[]>(this.url + '/blogs').subscribe(next =>{
      localStorage.setItem("blogsCache", JSON.stringify(next));
    });
  }

  public save(blog: Blog): Observable<any>{
    return this.httpClient.post(this.url + '/blog', blog);
  }

  public update(blog: Blog, id: number): Observable<any>{
    return this.httpClient.put(this.url + '/blog/' + id, blog);
  }

  public delete(id): Observable<any>{
    return this.httpClient.delete(this.url + '/blog/' + id);
  }

}
