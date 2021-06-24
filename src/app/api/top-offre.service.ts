import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TopOffre} from '../models/top-offre';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TopOffreService {
  private url = environment.baseUrl;
  constructor(private httpClient: HttpClient) { }

  public getById(id: any): Observable<any> {
    return this.httpClient.get<TopOffre>(this.url + '/top_offres/' + id);
  }

}


