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

  // getSummary(): string {
  //   const abstract: string[] = this.result.abstract.split(' ').slice(0, 25);
  //   const tldr: string = abstract.join(' ') + '...';
  //   return tldr;
  // }

  getAccordionDescription(): string {
    return `${this.result.corpusName}, ${this.result.host.title} ...`;
  }
}
