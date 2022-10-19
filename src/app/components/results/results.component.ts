import { Component, OnInit } from '@angular/core';
import { IstexRecord } from 'src/app/IstexRecord';
import { APIResult } from 'src/app/APIResult';
import { IstexService } from 'src/app/services/istex.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent implements OnInit {
  results: IstexRecord[] = [];
  constructor(private istexService: IstexService) {}

  ngOnInit(): void {
    // this.istexService
    //   .getResults()
    //   .subscribe((results) => (this.results = results.hits));
  }

  onSearch(): void {
    this.istexService
      .getResults()
      .subscribe((results) => (this.results = results.hits));
  }
}
