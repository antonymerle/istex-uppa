import { Component, OnInit } from '@angular/core';
import { IstexService } from 'src/app/services/istex.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  value: string = '';

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

  areResultsDisplayed(): boolean {
    return this.istexService.getTotal() ? true : false;
  }
}
