import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { IstexService } from 'src/app/services/istex.service';
import {
  Bucket,
  FacetCategory,
  Facet,
  FacetContainer,
} from 'src/app/Aggregation';
import { Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-facet',
  templateUrl: './facet.component.html',
  styleUrls: ['./facet.component.css'],
})
export class FacetComponent implements OnInit {
  @Input() facetGroup!: Facet[];
  @Input() facetCategory!: FacetCategory;
  // @Output() checkbox: EventEmitter<string> = new EventEmitter();

  dateFacet = this.istexService.BSfacets.asObservable();

  // bornes = this.setMinValue();
  minValue: number = 0;
  maxValue: number = 0;
  options: Options = {
    floor: 0,
    ceil: this.getYear(),
  };

  constructor(private istexService: IstexService) {}

  ngOnInit(): void {
    this.setMinValue();
  }

  onCheck(facetCategory: FacetCategory, facet: string) {
    // console.log(key);
    // this.checkbox.emit(facet);
    this.istexService.registerFacet(facetCategory, facet);
  }

  setMinValue() {
    console.log('facet category : ', this.facetCategory);
    console.log(this.facetGroup);

    this.dateFacet.subscribe((data) => {
      console.log(data);
      const dates = data.publicationDatecheckedFacets[0].key.split('-');
      this.minValue = parseInt(dates[0]);
      this.maxValue = parseInt(dates[1]);
      console.log('minValue', this.minValue);
      console.log('maxValue', this.maxValue);
    });
  }

  getYear(): number {
    const date = new Date();
    return date.getFullYear();
  }

  onSubmit() {
    console.log('submit');
    console.log(this.minValue, this.maxValue);
    this.istexService.registerFacet(3, `${this.minValue}-${this.maxValue}`);
  }
}
