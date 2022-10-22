import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-select-results-size',
  templateUrl: './select-results-size.component.html',
  styleUrls: ['./select-results-size.component.css'],
})
export class SelectResultsSizeComponent {
  constructor() {}

  resultSizeFormGroup: FormGroup = new FormGroup({
    resultsSize: new FormControl(),
  });
  resultsSize: Array<number> = [10, 20, 50, 100, 200, 500];

  selected: number = 10;

  onSelectOption(value: number) {
    console.log(value);
  }
}
