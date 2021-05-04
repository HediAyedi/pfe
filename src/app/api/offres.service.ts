import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Offres} from '../models/offres';

export class OffresService {
  private url = environment.baseUrl;
  constructor(private httpClient: HttpClient) { }

  public getAll(): Observable<Offres[]> {
    return this.httpClient.get<Offres[]>(this.url + '/emplois');
  }

  public save(offre: Offres): Observable<any>{
    return this.httpClient.post(this.url + '/emploi', offre);
  }

  public update(offre: Offres, id: number): Observable<any>{
    return this.httpClient.put(this.url + '/emploi/' + id, offre);
  }

  public delete(id): Observable<any>{
    return this.httpClient.delete(this.url + '/emploi/' + id);
  }
}
