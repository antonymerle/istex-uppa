import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

// interfaces
import {
  FacetCategory,
  Facet,
  FacetContainer,
  DateRange,
} from '../Aggregation';
import { APIResult } from '../APIResult';
import { IstexRecord } from '../IstexRecord';
import { Paginator } from '../Paginator';

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

  searchQuery: string = '';

  BSResult = new BehaviorSubject(this.results);
  BSApiResponse = new BehaviorSubject(this.apiResponse);

  facets: FacetContainer = {
    corpusNamecheckedFacets: [] as Facet[],
    genrecheckedFacets: [] as Facet[],
    languagecheckedFacets: [] as Facet[],
    publicationDatecheckedFacets: [] as Facet[],
  };

  dateRange: DateRange = { start: -1, end: -1 };

  BSfacets = new BehaviorSubject(this.facets);

  constructor(private http: HttpClient) {}

  getTotal(): number {
    if (!this.BSApiResponse.getValue()) return 0;
    return this.BSApiResponse.getValue().total;
  }

  getResults(query: string = '', persistFacets: boolean = false): void {
    this.searchQuery = query ? query : this.searchQuery;
    const queryURL =
      this.apiURL +
      this.searchQuery +
      this.genFacetsQuery() +
      this.fmtSzQueryParam() +
      '&output=*' +
      '&facet=corpusName,genre,language,publicationDate';

    console.log(queryURL);

    this.http.get<APIResult>(queryURL).subscribe((data) => {
      this.BSApiResponse.next(data);
      this.BSResult.next(data.hits);
      this.paginator.totalPages = this.getPaginatorTotalPages();
      if (!persistFacets) {
        this.facets = this.initFacets();
        this.BSfacets.next(this.facets);
      }
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

    // on attend 4 pour décaler le range de pages
    if (this.paginator.pageIndex < 4) {
      return this.genArrayFromLowerBound(1, this.paginator.RANGE);
    }

    // cas normal, on génère un range de pages dont le milieu est pageIndex
    return this.genArrayFromLowerBound(
      this.paginator.pageIndex - middleOffset,
      this.paginator.RANGE
    );
  }

  incrementIndex(n: number) {
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

  registerFacet(category: FacetCategory, facet: string) {
    switch (category) {
      case 0:
        for (let f of this.BSfacets.getValue().corpusNamecheckedFacets) {
          if (f.key === facet) {
            f.checked = !f.checked;
          }
        }
        break;

      case 1:
        for (let f of this.BSfacets.getValue().genrecheckedFacets) {
          if (f.key === facet) {
            f.checked = !f.checked;
          }
        }
        break;

      case 2:
        for (let f of this.BSfacets.getValue().languagecheckedFacets) {
          if (f.key === facet) {
            f.checked = !f.checked;
          }
        }
        break;

      // TODO : supprimer ce code. Remplacer par fn registerDateFacet
      case 3:
        this.BSfacets.getValue().publicationDatecheckedFacets[0].key = facet;
        break;

      default:
        console.log('unknown facet group.');
    }

    console.log(this.BSfacets.getValue().corpusNamecheckedFacets);
    console.log(this.BSfacets.getValue().genrecheckedFacets);
    console.log(this.BSfacets.getValue().languagecheckedFacets);
    console.log(this.BSfacets.getValue().publicationDatecheckedFacets);

    this.getResults('', true);
  }

  genFacetsQuery(): string {
    const facetsQuery = `${this.genFacetQuery(
      0,
      this.BSfacets.getValue().corpusNamecheckedFacets
    )}${this.genFacetQuery(
      1,
      this.BSfacets.getValue().genrecheckedFacets
    )}${this.genFacetQuery(
      2,
      this.BSfacets.getValue().languagecheckedFacets
    )}${this.genFacetQuery(
      3,
      this.BSfacets.getValue().publicationDatecheckedFacets
    )}`;

    console.log('DEBUG genFacetsQuery');

    console.log('genFacetsQuery', facetsQuery);

    return facetsQuery;
  }

  genFacetQuery(facetCategory: FacetCategory, params: Facet[]): string {
    const selector = ['corpusName', 'genre', 'language', 'publicationDate']; // indexes map FacetCategory enum

    console.log('DEBUG  genFacetQuery');

    if (params.length) {
      let paramsChain = '';

      // if publicationDate, format is publicationDate:[1974%20TO%202012]
      if (facetCategory === 3 && params.length) {
        console.log('GENFACETQUERY');
        console.log(params);

        const dates = params[0].key.split('-');
        return ` AND ${selector[facetCategory]}:[${dates[0]} TO ${dates[1]}]`;
      }

      // ex: corpusName:(elsevier%20OR%20wiley)

      for (let i = 0; i < params.length; i++) {
        if (params[i].checked) {
          paramsChain += `${params[i].key}${' OR '}`;
        }
      }
      if (paramsChain.endsWith(' OR ')) {
        paramsChain = paramsChain.slice(0, paramsChain.length - 4);
      }

      return paramsChain
        ? ` AND ${selector[facetCategory]}:(${paramsChain})`
        : '';
    }
    return '';
  }

  initFacets(): FacetContainer {
    const aggregations = this.BSApiResponse.getValue().aggregations;

    let initFacets = {
      corpusNamecheckedFacets: [] as Facet[],
      genrecheckedFacets: [] as Facet[],
      languagecheckedFacets: [] as Facet[],
      publicationDatecheckedFacets: [] as Facet[],
    };

    initFacets.corpusNamecheckedFacets = aggregations.corpusName.buckets.map(
      (el) => {
        return {
          key: el.key,
          docCount: el.docCount,
          checked: false,
        };
      }
    );

    initFacets.genrecheckedFacets = aggregations.genre.buckets.map((el) => {
      return {
        key: el.key,
        docCount: el.docCount,
        checked: false,
      };
    });

    initFacets.languagecheckedFacets = aggregations.language.buckets.map(
      (el) => {
        return {
          key: el.key,
          docCount: el.docCount,
          checked: false,
        };
      }
    );

    initFacets.publicationDatecheckedFacets =
      aggregations.publicationDate.buckets.map((el) => {
        return {
          key: el.key,
          docCount: el.docCount,
          checked: false,
        };
      });
    return initFacets;
  }

  registerDatesFacet(dateRange: DateRange) {
    this.dateRange = dateRange;
  }
}
