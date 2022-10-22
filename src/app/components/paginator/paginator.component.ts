import { Component, OnInit, Input } from '@angular/core';
import { APIResult } from 'src/app/APIResult';
import { IstexService } from 'src/app/services/istex.service';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css'],
})
export class PaginatorComponent implements OnInit {
  constructor(private istexService: IstexService) {}

  ngOnInit(): void {}

  getTotal() {
    return this.istexService.getTotal();
  }

  getPageIndex() {
    return this.istexService.getPageIndex();
  }

  getNextResults() {
    this.istexService.getNextResults();
  }

  getPreviousResults() {
    this.istexService.getPreviousResults();
  }

  getIndexPageResults(index: number) {
    this.istexService.getIndexPageResults(index);
  }

  getPagesRange(): Array<number> {
    return this.istexService.getPagesRange();
  }
}
