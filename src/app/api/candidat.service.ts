import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Candidat} from '../models/candidat';

@Injectable({
  providedIn: 'root'
})
export class CandidatService {
  private url = environment.baseUrl;
  constructor(private httpClient: HttpClient) { }

  public getAll(): Observable<Candidat[]> {
    return this.httpClient.get<Candidat[]>(this.url + '/candidats');
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
