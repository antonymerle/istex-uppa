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
      if (this.paginator.pageIndex === 0) {
        this.paginator.pageIndex++;
      } else {
        // reset état car le paginateur était déjà déclenché par une précédente recherche
        this.paginator.pageIndex = 1;
      }
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

  getIndexPageResults(index: number) {
    index = index - 1; // API count from 0, frontend from 1
    if (index > Math.ceil(this.BSApiResponse.getValue().total / 10)) {
      // 10 = nombre de résultat par page. TODO : à rendre dynamique
      return;
    }
    const apiURLFromIndex =
      this.BSApiResponse.getValue().firstPageURI?.slice(0, -1) +
      (index * 10).toString(); // _API_URL_&from=0 -> _API_URL_&from=index*10
    console.log(apiURLFromIndex);

    this.http.get<APIResult>(apiURLFromIndex).subscribe((data) => {
      this.BSApiResponse.next(data);
      this.BSResult.next(data.hits);
      this.incrementIndex(index);
    });
  }

  getPagesRange(): Array<number> {
    let array: number[] = [];
    const middleOffset = this.paginator.pageIndex > 3 ? 2 : 0;
    let i = 0;
    while (i < this.paginator.RANGE) {
      array.push(this.paginator.pageIndex - middleOffset + i);
      i++;
    }
    return array;
  }

  incrementIndex(n: number) {
    const newIndex = this.BSPageIndex.getValue() + n;
    this.paginator.pageIndex += n;
  }

  getPageIndex(): number {
    return this.paginator.pageIndex;
  }
}
