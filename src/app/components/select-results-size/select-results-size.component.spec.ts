import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectResultsSizeComponent } from './select-results-size.component';

describe('SelectResultsSizeComponent', () => {
  let component: SelectResultsSizeComponent;
  let fixture: ComponentFixture<SelectResultsSizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectResultsSizeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectResultsSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
