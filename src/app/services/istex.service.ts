import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIResult } from '../APIResult';
import { Observable } from 'rxjs';
import { SearchService } from './search.service';

@Injectable({
  providedIn: 'root',
})
export class IstexService {
  private apiURL = 'https://api.istex.fr/document/?q=';

  constructor(private http: HttpClient, private searchService: SearchService) {}

  getResults(query: string): Observable<APIResult> {
    return this.http.get<APIResult>(this.apiURL + query);
  }
}
