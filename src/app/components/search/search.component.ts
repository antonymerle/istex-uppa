import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  text: string = '';
  // @Output() btnClick = new EventEmitter();

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {}

  onSubmit() {
    this.searchService.onQuery(this.text);
  }
}
