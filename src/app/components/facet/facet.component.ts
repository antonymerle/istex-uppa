import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { IstexService } from 'src/app/services/istex.service';
import { Bucket } from 'src/app/Aggregation';

@Component({
  selector: 'app-facet',
  templateUrl: './facet.component.html',
  styleUrls: ['./facet.component.css'],
})
export class FacetComponent implements OnInit {
  @Input() facetGroup!: Bucket;
  @Output() checkbox = new EventEmitter();

  constructor(private istexService: IstexService) {}

  ngOnInit(): void {}

  onCheck(key: string) {
    // console.log(key);
    this.checkbox.emit();
  }
}
