import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Offre} from '../models/offre';
import { Injectable } from '@angular/core';

const CACHE_KEY= 'offresCache'; 

@Injectable({
  providedIn: 'root'
})

export class OffreService {
  private url = environment.baseUrl;
  constructor(private httpClient: HttpClient) { }

  public getAllCache() {
    this.httpClient.get<Offre[]>(this.url + '/emplois').subscribe(next =>{
      localStorage[CACHE_KEY]=JSON.stringify(next);
    });
  }

  // Returns All active offres
  public getAll(): Observable<any> {
    
    return this.httpClient.get<Offre[]>(this.url + '/emplois');
  }

  // Returns All active offres by using employeur id
  public getOffresByEmployeur(employeur_id): Observable<any> {
    
    return this.httpClient.get<Offre[]>(this.url + '/emplois/search/' + employeur_id);
  }

  // Returns All active offres by using domaine
  public getOffresByDomaine(domaine): Observable<any> {
    
    return this.httpClient.get<Offre[]>(this.url + '/emplois/search/' + domaine);
  }


  public get(id: any): Observable<any>{
    return this.httpClient.get<Offre>(this.url + '/emploi/' + id);
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
