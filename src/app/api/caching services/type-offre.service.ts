import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TypeOffre } from '../../models/type-offre';

const CACHE_KEY= 'type_offresCache'; 

@Injectable({
  providedIn: 'root'
})

export class TypeOffreService {
  
  private url = environment.baseUrl;
  constructor(private httpClient: HttpClient) { }

  public async getAllCache(){
    this.httpClient.get<TypeOffre[]>(this.url + '/emploi_types').subscribe(next =>{
      localStorage[CACHE_KEY]=JSON.stringify(next);
    });
  }

  public save(emploi_type: TypeOffre): Observable<any>{
    return this.httpClient.post(this.url + '/emploi_type', emploi_type);
  }

  public update(emploi_type: TypeOffre, id: number): Observable<any>{
    return this.httpClient.put(this.url + '/emploi_type/' + id, emploi_type);
  }

  public delete(id): Observable<any>{
    return this.httpClient.delete(this.url + '/emploi_type/' + id);
  }

}
