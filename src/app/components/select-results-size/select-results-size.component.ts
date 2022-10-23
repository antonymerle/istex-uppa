import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { IstexService } from 'src/app/services/istex.service';

@Component({
  selector: 'app-select-results-size',
  templateUrl: './select-results-size.component.html',
  styleUrls: ['./select-results-size.component.css'],
})
export class SelectResultsSizeComponent {
  constructor(private istexService: IstexService) {}

  resultSizeFormGroup: FormGroup = new FormGroup({
    resultsSize: new FormControl(),
  });
  resultsSize: Array<number> = [10, 20, 50, 100, 200, 500];

  selected: number = 10;

  onSelectOption() {
    this.istexService.setResultsSize(this.selected);
    // console.log(this.selected);
  }
}
