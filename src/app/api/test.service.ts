import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Test} from '../models/test';
import {environment} from '../../environments/environment';

const CACHE_KEY= 'testsCache'; 

@Injectable({
  providedIn: 'root'
})
export class TestService {

  private url = environment.baseUrl;
  constructor(private httpClient: HttpClient) { }
  
  public getAllCache(){
    this.httpClient.get<Test[]>(this.url + '/tests').subscribe(next =>{
      localStorage[CACHE_KEY]=JSON.stringify(next);
    });
  }

  public getAll(): Observable<any>{
    return this.httpClient.get<Test[]>(this.url + '/tests');
  }


  public save(test: Test): Observable<any>{
    return this.httpClient.post(this.url + '/test', test);
  }

  public update(test: Test, id: number): Observable<any>{
    return this.httpClient.put(this.url + '/test/' + id, test);
  }

  public delete(id): Observable<any>{
    return this.httpClient.delete(this.url + '/test/' + id);
  }


}
