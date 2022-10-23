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
    totalPages: 0,
    pageIndex: 0,
    DEFAULT_RESULTS_SIZE: 10,
    RESULTS_MAX_SIZE: 500,
    resultsSize: 10,
  };

  BSResult = new BehaviorSubject(this.results);
  BSApiResponse = new BehaviorSubject(this.apiResponse);
  // BSPageIndex = new BehaviorSubject(0);

  constructor(private http: HttpClient) {}

  getTotal(): number {
    if (!this.BSApiResponse.getValue()) return 0;
    return this.BSApiResponse.getValue().total;
  }

  getResults(query: string): void {
    this.http
      .get<APIResult>(this.apiURL + query + this.fmtSzQueryParam())
      .subscribe((data) => {
        this.BSApiResponse.next(data);
        this.BSResult.next(data.hits);
        this.paginator.totalPages = this.getPaginatorTotalPages();
        if (this.paginator.pageIndex > 0) {
          // reset état car le paginateur était déjà déclenché par une précédente recherche
          this.paginator.pageIndex = 0;
        }
        this.paginator.pageIndex++;
      });
  }

  getNextResults(): void {
    console.log(this.BSApiResponse.getValue().nextPageURI!);
    if (
      !this.BSApiResponse.getValue() ||
      this.paginator.pageIndex >= this.getTotal()
    )
      return;

    this.http
      .get<APIResult>(this.BSApiResponse.getValue().nextPageURI!)
      .subscribe((data) => {
        this.BSApiResponse.next(data);
        this.BSResult.next(data.hits);
      });

    this.paginator.pageIndex++;
    console.log('getNextResults');
  }

  getPreviousResults(): void {
    if (!this.BSApiResponse.getValue() || this.paginator.pageIndex <= 1) return;

    this.http
      .get<APIResult>(this.BSApiResponse.getValue().prevPageURI!)
      .subscribe((data) => {
        this.BSApiResponse.next(data);
        this.BSResult.next(data.hits);
      });

    this.paginator.pageIndex--;
    console.log('getPreviousResults');
  }

  getPageResultsByPageIndex(index: number) {
    if (index > this.getPaginatorTotalPages()) {
      return;
    }
    const apiURLFromIndex =
      this.BSApiResponse.getValue().firstPageURI?.slice(0, -1) +
      ((index - 1) * this.paginator.resultsSize).toString(); // _API_URL_&from=0 -> _API_URL_&from=index*10
    console.log(apiURLFromIndex);

    this.http.get<APIResult>(apiURLFromIndex).subscribe((data) => {
      this.BSApiResponse.next(data);
      this.BSResult.next(data.hits);
      // this.incrementIndex(index);
      this.paginator.pageIndex = index;
    });
  }

  getPagesRange(): Array<number> {
    let array: number[] = [];
    const middleOffset = 2;

    // genPageRange doit toujours générer des arrays de 5 numeros ou à défaut de totalPages

    // si il y a moins de pages que RANGE (5)
    if (this.paginator.totalPages < this.paginator.RANGE) {
      return this.genArrayFromLowerBound(1, this.paginator.totalPages);
    }

    // si le paginateur arrive au bout de l'array de pages, on bloque
    if (this.paginator.pageIndex + middleOffset >= this.paginator.totalPages) {
      return this.genArrayFromLowerBound(
        this.paginator.totalPages + 1 - this.paginator.RANGE,
        this.paginator.totalPages + 1
      );
    }

    // on attend 4 pour décalerle range de pages
    if (this.paginator.pageIndex < 4) {
      return this.genArrayFromLowerBound(1, this.paginator.RANGE);
    }

    // cas normal, on génère un range de pages dont le milieu est pageIndex
    return this.genArrayFromLowerBound(
      this.paginator.pageIndex - middleOffset,
      this.paginator.RANGE
    );

    // ========================================

    // // début de pagination
    // if (this.paginator.pageIndex < 4) {
    //   return [1, 2, 3, 4, 5];
    // }

    // // fin de pagination
    // if (this.paginator.pageIndex >= this.paginator.totalPages - 5) {
    //   let i = 0;
    //   while (i < this.paginator.RANGE && i <= this.paginator.totalPages) {
    //     array.push(this.paginator.pageIndex + i);
    //     i++;
    //   }
    //   return array;
    // }

    // const middleOffset = 2;
    // let i = 0;
    // while (i < this.paginator.RANGE) {
    //   array.push(this.paginator.pageIndex + i - middleOffset);
    //   i++;
    // }
    // console.log('get page range');
    // console.log(array);

    // return array;
  }

  incrementIndex(n: number) {
    // const newIndex = this.BSPageIndex.getValue() + n;
    this.paginator.pageIndex += n;
  }

  getPageIndex(): number {
    console.log('get page index : ' + this.paginator.pageIndex);

    return this.paginator.pageIndex;
  }

  setResultsSize(size: number = this.paginator.DEFAULT_RESULTS_SIZE): void {
    if (
      size < this.paginator.DEFAULT_RESULTS_SIZE ||
      size > this.paginator.RESULTS_MAX_SIZE
    )
      this.paginator.resultsSize = this.paginator.DEFAULT_RESULTS_SIZE;

    this.BSApiResponse.subscribe((data) => {
      data.nextPageURI = data.nextPageURI?.replace(
        this.fmtSzQueryParam(),
        `&size=${size}`
      );
      data.prevPageURI = data.prevPageURI?.replace(
        this.fmtSzQueryParam(),
        `&size=${size}`
      );
    });

    this.paginator.resultsSize = size;
    this.paginator.totalPages = this.getPaginatorTotalPages();

    console.log('istexService selected size : ');
    console.log(this.paginator);
  }

  fmtSzQueryParam(): string {
    return `&size=${this.paginator.resultsSize}`;
  }

  getPaginatorTotalPages(): number {
    return Math.ceil(
      this.BSApiResponse.getValue().total / this.paginator.resultsSize
    );
  }

  genArrayFromLowerBound(lowerBound: number, sz: number): Array<number> {
    return Array.from(new Array(sz), (x, i) => i + lowerBound);
  }
}
