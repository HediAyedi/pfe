import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Question} from '../models/question';
import {environment} from '../../environments/environment';

const CACHE_KEY= 'employeursCache'; 

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private url = environment.baseUrl;
  constructor(private httpClient: HttpClient) { }
  
  

  public getAll(): Observable<any>{
    return this.httpClient.get<Question[]>(this.url + '/questions');
  }

  public getAllByID(id): Observable<any>{
    return this.httpClient.get<Question[]>(this.url + '/questions/'+id);
  }

  public get(id: any): Observable<any>{
    return this.httpClient.get<Question>(this.url + '/question/' + id);
  }

  public save(question: Question): Observable<any>{
    return this.httpClient.post(this.url + '/question', question);
  }

  public update(question: Question, id: number): Observable<any>{
    return this.httpClient.put(this.url + '/question/' + id, question);
  }

  public delete(id): Observable<any>{
    return this.httpClient.delete(this.url + '/question/' + id);
  }



}
