import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Candidature} from '../models/candidature';
import { Injectable } from '@angular/core';

const CACHE_KEY= 'candidaturesCache'; 

@Injectable({
  providedIn: 'root'
})

export class CandidatureService {
  private url = environment.baseUrl;
  constructor(private httpClient: HttpClient) { }

  public getAllCache() {
    this.httpClient.get<Candidature[]>(this.url + '/candidatures').subscribe(next =>{
      localStorage[CACHE_KEY]=JSON.stringify(next);
    });
  }

  public getAll(): Observable<any> {
    
    return this.httpClient.get<Candidature[]>(this.url + '/candidatures');
  }

  public get(id: any): Observable<any>{
    return this.httpClient.get<Candidature>(this.url + '/candidature/' + id);
  }


  public save(candidature: Candidature): Observable<any>{
    return this.httpClient.post(this.url + '/candidature', candidature);
  }

  public update(candidature: Candidature, id: number): Observable<any>{
    return this.httpClient.put(this.url + '/candidature/' + id, candidature);
  }

  public delete(id): Observable<any>{
    return this.httpClient.delete(this.url + '/candidature/' + id);
  }
}
