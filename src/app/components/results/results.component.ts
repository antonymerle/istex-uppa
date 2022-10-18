import { Component, OnInit } from '@angular/core';
import { IstexRecord } from 'src/app/IstexRecord';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent implements OnInit {
  results: IstexRecord[] = [
    { arkIstex: 'bla', title: 'bleh', id: '1abcd', score: 12 },
  ];

  constructor() {}

  ngOnInit(): void {
    // this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks));
  }
}
