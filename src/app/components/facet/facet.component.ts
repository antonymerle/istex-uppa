import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { IstexService } from 'src/app/services/istex.service';

@Component({
  selector: 'app-facet',
  templateUrl: './facet.component.html',
  styleUrls: ['./facet.component.css'],
})
export class FacetComponent implements OnInit {
  data = this.istexService.BSApiResponse.asObservable();

  constructor(private istexService: IstexService) {}

  ngOnInit(): void {}
}
