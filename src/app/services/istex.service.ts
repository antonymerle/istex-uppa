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
  apiResponse!: APIResult;
  results: IstexRecord[] = [];

  BSResult = new BehaviorSubject(this.results);
  BSApiResponse = new BehaviorSubject(this.apiResponse);

  constructor(private http: HttpClient) {}

  getResults(query: string): void {
    this.http.get<APIResult>(this.apiURL + query).subscribe((data) => {
      this.BSApiResponse.next(data);
      this.BSResult.next(data.hits);
    });
  }

  getNextResults(): void {
    console.log(this.BSApiResponse.getValue().nextPageURI!);
    if (!this.BSApiResponse.getValue()) return;

    this.http
      .get<APIResult>(this.BSApiResponse.getValue().nextPageURI!)
      .subscribe((data) => {
        this.BSApiResponse.next(data);
        this.BSResult.next(data.hits);
      });
    console.log('getNextResults');
  }
}
