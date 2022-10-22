import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIResult } from '../APIResult';
import { IstexRecord } from '../IstexRecord';
import { Paginator } from '../Paginator';
import { Observable, Subject, of, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IstexService {
  private apiURL = 'https://api.istex.fr/document/?q=';
  apiResponse!: APIResult;
  results: IstexRecord[] = [];
  paginator: Paginator = {
    RANGE: 5,
    pageIndex: 0,
  };

  BSResult = new BehaviorSubject(this.results);
  BSApiResponse = new BehaviorSubject(this.apiResponse);
  BSPageIndex = new BehaviorSubject(0);

  constructor(private http: HttpClient) {}

  getResults(query: string): void {
    this.http.get<APIResult>(this.apiURL + query).subscribe((data) => {
      this.BSApiResponse.next(data);
      this.BSResult.next(data.hits);
      // this.incrementIndex(1);
      // console.log(this.BSPageIndex.getValue());
      this.paginator.pageIndex++;
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

    this.paginator.pageIndex++;
    console.log('getNextResults');
  }

  incrementIndex(n: number) {
    const newIndex = this.BSPageIndex.getValue() + n;
    this.BSPageIndex.next(newIndex);
  }

  getPagesRange(): Array<number> {
    let array: number[] = [];
    let i = 0;
    while (i < this.paginator.RANGE) {
      array.push(this.paginator.pageIndex + i);
      i++;
    }
    return array;
  }

  getPageIndex(): number {
    return this.paginator.pageIndex;
  }
}
