import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIResult } from '../APIResult';
import { IstexRecord } from '../IstexRecord';
import { Observable, Subject, of, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IstexService {
  private apiURL = 'https://api.istex.fr/document/?q=';
  results: IstexRecord[] = [];
  beh = new BehaviorSubject(this.results);

  constructor(private http: HttpClient) {}
  getResults(query: string): void {
    this.http.get<APIResult>(this.apiURL + query).subscribe((results) => {
      this.beh.next(results.hits);
      console.log(results.hits);
    });
  }
}
