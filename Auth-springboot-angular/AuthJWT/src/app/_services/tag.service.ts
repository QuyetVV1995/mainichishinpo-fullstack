import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tag } from '../model/tag';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  private allTagURL = 'http://localhost:8080/post/getTag';
  tags : Tag[];

  constructor(
    private http:HttpClient
  ) { }

  getAllTag(): Observable<Tag[]>{
    return this.http.get<Tag[]>(`${this.allTagURL}`);
  }
}
