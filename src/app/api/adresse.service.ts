import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Adresse } from '../models/adresse';

@Injectable({
  providedIn: 'root'
})
export class AdresseService {

  private url = environment.baseUrl;
  constructor(private httpClient: HttpClient) { }

  public getAll(): Observable<Adresse[]> {
    return this.httpClient.get<Adresse[]>(this.url + '/adresses');
  }
  

  public save(adresse: Adresse): Observable<any>{
    return this.httpClient.post(this.url + '/adresse', adresse);
  }

  public update(adresse: Adresse, id: number): Observable<any>{
    return this.httpClient.put(this.url + '/adresse/' + id, adresse);
  }

  public delete(id): Observable<any>{
    return this.httpClient.delete(this.url + '/adresse/' + id);
  }
}
