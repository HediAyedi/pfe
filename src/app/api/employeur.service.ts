import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Employeur} from '../models/employeur';
import {environment} from '../../environments/environment';

const CACHE_KEY= 'employeursCache'; 

@Injectable({
  providedIn: 'root'
})
export class EmployeurService {
  private url = environment.baseUrl;
  constructor(private httpClient: HttpClient) { }
  
  public getAllCache(){
    this.httpClient.get<Employeur[]>(this.url + '/employeurs').subscribe(next =>{
      localStorage[CACHE_KEY]=JSON.stringify(next);
    });
  }

  public getAll(): Observable<any>{
    return this.httpClient.get<Employeur[]>(this.url + '/employeurs');
  }

  public getAllForAdmin(): Observable<any>{
    return this.httpClient.get<Employeur[]>(this.url + '/employeursForAdmin');
  }

  public get(id: any): Observable<any>{
    return this.httpClient.get<Employeur>(this.url + '/employeur/' + id);
  }

  public logIn(employeur: Employeur): Observable<any>{
    return this.httpClient.post(this.url + '/loginEmployeur', employeur);
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
