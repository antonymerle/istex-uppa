import { Component, OnInit } from '@angular/core';
import { IstexService } from 'src/app/services/istex.service';

@Component({
  selector: 'app-facets',
  templateUrl: './facets.component.html',
  styleUrls: ['./facets.component.css'],
})
export class FacetsComponent implements OnInit {
  facets = this.istexService.BSfacets.asObservable();

  constructor(private istexService: IstexService) {}

  ngOnInit(): void {}
}
