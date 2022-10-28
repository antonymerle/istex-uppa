import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IstexService } from 'src/app/services/istex.service';
import { IstexRecord } from 'src/app/IstexRecord';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  value: string = '';
  results: IstexRecord[] = [];
  constructor(private istexService: IstexService) {}

  ngOnInit(): void {}

  onSubmit() {
    this.istexService.getResults(this.value);
  }

  onEnter(event: any) {
    event.preventDefault();
    this.istexService.getResults(this.value);
    console.log('Votre recherche :' + event.target.value);
  }
}
