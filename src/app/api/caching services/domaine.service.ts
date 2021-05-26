import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../src/environments/environment';
import { Domaine } from '../../models/domaine';


const CACHE_KEY= 'domainesCache'; 

@Injectable({
  providedIn: 'root'
})

export class DomaineService {
  
  private url = environment.baseUrl;
  constructor(private httpClient: HttpClient) { }

  public async getAllCache(){
    this.httpClient.get<Domaine[]>(this.url + '/domaines').subscribe(next =>{
      localStorage[CACHE_KEY]=JSON.stringify(next);
    });
  }

  public save(domaine: Domaine): Observable<any>{
    return this.httpClient.post(this.url + '/domaine', domaine);
  }

  public update(domaine: Domaine, id: number): Observable<any>{
    return this.httpClient.put(this.url + '/domaine/' + id, domaine);
  }

  public delete(id): Observable<any>{
    return this.httpClient.delete(this.url + '/domaine/' + id);
  }

}
