import { Component, OnInit, Input } from '@angular/core';
import { IstexRecord } from 'src/app/IstexRecord';
import { APIResult } from 'src/app/APIResult';
import { IstexService } from 'src/app/services/istex.service';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent implements OnInit {
  results = this.istexService.BSResult.asObservable();

  constructor(private istexService: IstexService) {}

  ngOnInit(): void {}

  // onClick() {
  //   console.log(this.results$.subscribe((results) => results));
  // }
}
