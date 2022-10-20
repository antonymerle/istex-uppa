import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IstexService } from 'src/app/services/istex.service';
import { IstexRecord } from 'src/app/IstexRecord';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  text: string = '';
  results: IstexRecord[] = [];
  constructor(private istexService: IstexService) {}

  ngOnInit(): void {}

  onSubmit() {
    this.istexService
      .getResults(this.text)
      .subscribe((results) => (this.results = results.hits));
  }
}
