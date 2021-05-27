import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Cv} from '../models/cv';
import {environment} from '../../environments/environment';
const CACHE_KEY= 'cvsCache'; 

  @Injectable({
    providedIn: 'root'
  })

export class CvService {

    private url = environment.baseUrl;
    constructor(private httpClient: HttpClient) { }
    
    public getAllCache(){
      this.httpClient.get<Cv[]>(this.url + '/cvs').subscribe(next =>{
        localStorage[CACHE_KEY]=JSON.stringify(next);
      });
    }
  
    public getAll(): Observable<any>{
      return this.httpClient.get<Cv[]>(this.url + '/cvs');
    }
  
    public get(id: any): Observable<any>{
      return this.httpClient.get<Cv>(this.url + '/cv/' + id);
    }
  
  
    public save(cv: Cv): Observable<any>{
      return this.httpClient.post(this.url + '/cv', cv);
    }
  
    public update(cv: Cv, id: any): Observable<any>{
      return this.httpClient.put(this.url + '/cv/' + id, cv);
    }
  
    public delete(id): Observable<any>{
      return this.httpClient.delete(this.url + '/cv/' + id);
    }
  }
  