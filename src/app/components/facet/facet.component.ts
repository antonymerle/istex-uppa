import { Component, OnInit, Input } from '@angular/core';
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

  constructor(private istexService: IstexService) {}

  ngOnInit(): void {}
}
