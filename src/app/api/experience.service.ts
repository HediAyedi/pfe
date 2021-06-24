
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import { Experience } from '../models/experience';

const CACHE_KEY= 'employeursCache'; 

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  private url = environment.baseUrl;
  constructor(private httpClient: HttpClient) { }
  
  

  public getAllById(id): Observable<any>{
    return this.httpClient.get<Experience[]>(this.url + '/experiences/' + id);
  }

  public get(id: any): Observable<any>{
    return this.httpClient.get<Experience>(this.url + '/experience/' + id);
  }

  public save(experience: Experience): Observable<any>{
    return this.httpClient.post(this.url + '/experience', experience);
  }

  public update(experience: Experience, id: number): Observable<any>{
    return this.httpClient.put(this.url + '/experience/' + id, experience);
  }

  public delete(id): Observable<any>{
    return this.httpClient.delete(this.url + '/experience/' + id);
  }



}
