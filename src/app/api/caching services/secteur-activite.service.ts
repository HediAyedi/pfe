
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments//environment';
import { SecteurActivite } from '../../models/secteur-activite';


const CACHE_KEY= 'secteursCache'; 

@Injectable({
  providedIn: 'root'
})

export class SecteurActiviteService {
  
  private url = environment.baseUrl;
  constructor(private httpClient: HttpClient) { }

  public async getAllCache() {
    this.httpClient.get<SecteurActivite[]>(this.url + '/secteur_activites').subscribe(next =>{
      localStorage[CACHE_KEY]=JSON.stringify(next);
    });
    
  }

  public save(secteur_activite: SecteurActivite): Observable<any>{
    return this.httpClient.post(this.url + '/secteur_activite', secteur_activite);
  }

  public update(secteur_activite: SecteurActivite, id: number): Observable<any>{
    return this.httpClient.put(this.url + '/secteur_activite/' + id, secteur_activite);
  }

  public delete(id): Observable<any>{
    return this.httpClient.delete(this.url + '/secteur_activite/' + id);
  }

}
