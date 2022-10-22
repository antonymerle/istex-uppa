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

  getLength(): number {
    const res = this.istexService.BSApiResponse.getValue();
    if (res) {
      return res.total;
    }
    return 0;
  }

  getPageIndex() {
    return this.istexService.getPageIndex();
  }

  getNextResults() {
    this.istexService.getNextResults();
  }

  getIndexPageResults(index: number) {
    this.istexService.getIndexPageResults(index);
  }

  getPagesRange(): Array<number> {
    return this.istexService.getPagesRange();
  }
}
