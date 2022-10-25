import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { IstexService } from 'src/app/services/istex.service';
import { Bucket, FacetCategory } from 'src/app/Aggregation';

@Component({
  selector: 'app-facet',
  templateUrl: './facet.component.html',
  styleUrls: ['./facet.component.css'],
})
export class FacetComponent implements OnInit {
  @Input() facetGroup!: Bucket;
  @Input() facetCategory!: FacetCategory;
  // @Output() checkbox: EventEmitter<string> = new EventEmitter();

  constructor(private istexService: IstexService) {}

  ngOnInit(): void {}

  onCheck(facetCategory: FacetCategory, facet: string) {
    // console.log(key);
    // this.checkbox.emit(facet);
    this.istexService.registerFacet(facetCategory, facet);
  }
}
