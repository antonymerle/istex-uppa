import { Component, OnInit, Input } from '@angular/core';
import { IstexRecord } from 'src/app/IstexRecord';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
})
export class ResultComponent implements OnInit {
  @Input() result!: IstexRecord;
  panelOpenState = false;
  constructor() {}

  ngOnInit(): void {}

  getAccordionDescription(): string {
    return `${this.result.corpusName}, ${this.result.host.title} ...`;
  }
}
