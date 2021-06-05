import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Note} from '../models/note';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class NoteService {
  private url = environment.baseUrl;
  constructor(private httpClient: HttpClient) { }

  public getAll(): Observable<any> {
    
    return this.httpClient.get<Note[]>(this.url + '/notes');
  }

  public get(id: any): Observable<any>{
    return this.httpClient.get<Note>(this.url + '/note/' + id);
  }


  public save(note: Note): Observable<any>{
    return this.httpClient.post(this.url + '/note', note);
  }

  public update(note: Note, id: number): Observable<any>{
    return this.httpClient.put(this.url + '/note/' + id, note);
  }

  public delete(id): Observable<any>{
    return this.httpClient.delete(this.url + '/note/' + id);
  }
}
