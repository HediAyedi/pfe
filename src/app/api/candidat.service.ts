import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Candidat} from '../models/candidat';

const CACHE_KEY= 'candidatsCache'; 

@Injectable({
  providedIn: 'root'
})
export class CandidatService {
  private url = environment.baseUrl;
  constructor(private httpClient: HttpClient) { }

  
  public getAll(){
    this.httpClient.get<Candidat[]>(this.url + '/candidats').subscribe(next =>{
      localStorage[CACHE_KEY]=JSON.stringify(next);
    });
  }

  public save(candidat: Candidat): Observable<any>{
    return this.httpClient.post(this.url + '/registerCandidat', candidat);
  }

  public update(candidat: Candidat, id: number): Observable<any>{
    return this.httpClient.put(this.url + '/candidat/' + id, candidat);
  }

  public delete(id): Observable<any>{
    return this.httpClient.delete(this.url + '/candidat/' + id);
  }
}
