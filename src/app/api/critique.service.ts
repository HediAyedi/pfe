import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Critique} from '../models/critique';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CritiqueService {

  private url = environment.baseUrl;
  constructor(private httpClient: HttpClient) { }

  public getAll(id): Observable<any> {
    
    return this.httpClient.get<Critique[]>(this.url + '/critiques/'+ id);
  }

  public get(id: any): Observable<any>{
    return this.httpClient.get<Critique>(this.url + '/critique/' + id);
  }

  public save(critique: Critique): Observable<any>{
    return this.httpClient.post(this.url + '/critique', critique);
  }

  public update(critique: Critique, id: number): Observable<any>{
    return this.httpClient.put(this.url + '/critique/' + id, critique);
  }

  public delete(id): Observable<any>{
    return this.httpClient.delete(this.url + '/critique/' + id);
  }
}
