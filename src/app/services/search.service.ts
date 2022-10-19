import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private query = '';
  constructor() {}

  onQuery(query: string) {
    this.query = query;
    console.log(this.query);
  }

  getQuery() {
    return this.query;
  }
}
