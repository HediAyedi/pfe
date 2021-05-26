import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Langue } from '../../models/langue';


const CACHE_KEY= 'languesCache'; 

@Injectable({
  providedIn: 'root'
})

export class LangueService {
  
  private url = environment.baseUrl;
  constructor(private httpClient: HttpClient) { }

  public async getAllCache(){
    this.httpClient.get<Langue[]>(this.url + '/langues').subscribe(next =>{
      localStorage[CACHE_KEY]=JSON.stringify(next);
    });
  }

  public save(langue: Langue): Observable<any>{
    return this.httpClient.post(this.url + '/langue', langue);
  }

  public update(langue: Langue, id: number): Observable<any>{
    return this.httpClient.put(this.url + '/langue/' + id, langue);
  }

  public delete(id): Observable<any>{
    return this.httpClient.delete(this.url + '/langue/' + id);
  }

}
