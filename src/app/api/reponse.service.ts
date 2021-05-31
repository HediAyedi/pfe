import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Reponse} from '../models/reponse';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReponseService {


  private url = environment.baseUrl;
  constructor(private httpClient: HttpClient) { }
  
  

  public getAll(): Observable<any>{
    return this.httpClient.get<Reponse[]>(this.url + '/reponses');
  }

  public get(id: any): Observable<any>{
    return this.httpClient.get<Reponse>(this.url + '/reponse/' + id);
  }

  public save(reponse: Reponse): Observable<any>{
    return this.httpClient.post(this.url + '/reponse', reponse);
  }

  public update(reponse: Reponse, id: number): Observable<any>{
    return this.httpClient.put(this.url + '/reponse/' + id, reponse);
  }

  public delete(id): Observable<any>{
    return this.httpClient.delete(this.url + '/reponse/' + id);
  }


}
