import { Component, OnInit, Input } from '@angular/core';
import { IstexService } from 'src/app/services/istex.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent implements OnInit {
  results = this.istexService.BSResult.asObservable();

  constructor(private istexService: IstexService) {}

  ngOnInit(): void {
    this.istexService.getPageIndex();
  }
}
