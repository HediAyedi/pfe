import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../src/environments/environment';
import { Competence } from '../../models/competence';


const CACHE_KEY= 'competencesCache'; 

@Injectable({
  providedIn: 'root'
})

export class CompetenceService {
  
  private url = environment.baseUrl;
  constructor(private httpClient: HttpClient) { }

  public async getAllCache(){
    this.httpClient.get<Competence[]>(this.url + '/competences').subscribe(next =>{
      localStorage[CACHE_KEY]=JSON.stringify(next);
    });
  }

  public save(competence: Competence): Observable<any>{
    return this.httpClient.post(this.url + '/competence', competence);
  }

  public update(competence: Competence, id: number): Observable<any>{
    return this.httpClient.put(this.url + '/competence/' + id, competence);
  }

  public delete(id): Observable<any>{
    return this.httpClient.delete(this.url + '/competence/' + id);
  }

}
