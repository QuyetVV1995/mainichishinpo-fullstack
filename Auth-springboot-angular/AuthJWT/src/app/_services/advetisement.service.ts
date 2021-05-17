import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdItem } from '../advertisement/ad-item';
import { HeroJobAdComponent } from '../advertisement/hero-job-ad.component';
import { KotobaComponent } from '../advertisement/kotoba.component';
import { Kotoba } from '../model/kotoba.model';

@Injectable({
  providedIn: 'root'
})
export class AdvetisementService {
  private baseURL = "http://localhost:8080/post";
  kotobaList: Kotoba[];
  constructor(
    private http: HttpClient
  ) { }


  getListKotoba():Observable<Kotoba[]>{
    return this.http.get<Kotoba[]>(`${this.baseURL}/kotoba`);
  }
}
