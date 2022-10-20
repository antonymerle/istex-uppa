import { Component, OnInit, Input } from '@angular/core';
import { IstexRecord } from 'src/app/IstexRecord';
import { APIResult } from 'src/app/APIResult';
import { IstexService } from 'src/app/services/istex.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent implements OnInit {
  @Input() results: IstexRecord[] = [];

  constructor() {}

  ngOnInit(): void {}
}
