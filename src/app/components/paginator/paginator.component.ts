import { Component, OnInit } from '@angular/core';
import { APIResult } from 'src/app/APIResult';
import { IstexService } from 'src/app/services/istex.service';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css'],
})
export class PaginatorComponent implements OnInit {
  lowValue: number = 0;
  highValue: number = 20;

  constructor(private istexService: IstexService) {}

  ngOnInit(): void {
    // this.istexService.getNextPageResults();
  }

  getLength(): number {
    const res = this.istexService.BSApiResponse.getValue();
    if (res) {
      return res.total;
    }
    return 0;
  }

  // used to build a slice of papers relevant at any given time
  // public getPaginatorData(event: PageEvent): PageEvent {
  //   this.lowValue = event.pageIndex * event.pageSize;
  //   this.highValue = this.lowValue + event.pageSize;
  //   return event;
  // }

  getNextResults() {
    this.istexService.getNextResults();
  }
}
