import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Offre} from '../models/offre';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class OffreService {
  private url = environment.baseUrl;
  constructor(private httpClient: HttpClient) { }

  public getAll(): Observable<Offre[]> {
    return this.httpClient.get<Offre[]>(this.url + '/emplois');
  }

  public save(offre: Offre): Observable<any>{
    return this.httpClient.post(this.url + '/emploi', offre);
  }

  public update(offre: Offre, id: number): Observable<any>{
    return this.httpClient.put(this.url + '/emploi/' + id, offre);
  }

  public delete(id): Observable<any>{
    return this.httpClient.delete(this.url + '/emploi/' + id);
  }
}
