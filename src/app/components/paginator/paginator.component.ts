import { Component, OnInit } from '@angular/core';
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
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  getPreviousResults() {
    this.istexService.getPreviousResults();
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  getIndexPageResults(index: number) {
    this.istexService.getPageResultsByPageIndex(index);
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  getPagesRange(): Array<number> {
    return this.istexService.getPagesRange();
  }
}
