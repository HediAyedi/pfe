import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Employeur} from '../models/employeur';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeurServiceService {
  private url = environment.baseUrl;
  constructor(private httpClient: HttpClient) { }
  public getAll(): Observable<Employeur[]> {
    return this.httpClient.get<Employeur[]>(this.url + '/employeurs');
  }

  public save(employeur: Employeur): Observable<any>{
    return this.httpClient.post(this.url + '/registerEmployeur', employeur);
  }

  public update(employeur: Employeur, id: number): Observable<any>{
    return this.httpClient.put(this.url + '/employeur/' + id, employeur);
  }

  public delete(id): Observable<any>{
    return this.httpClient.delete(this.url + '/employeur/' + id);
  }
}
