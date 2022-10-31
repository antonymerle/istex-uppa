import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  year = this.getFooterYear();
  constructor() {}

  ngOnInit(): void {}

  getFooterYear(): number {
    const date = new Date();
    return date.getFullYear();
  }
}
