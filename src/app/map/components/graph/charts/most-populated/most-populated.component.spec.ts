import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostPopulatedComponent } from './most-populated.component';

describe('MostPopulatedComponent', () => {
  let component: MostPopulatedComponent;
  let fixture: ComponentFixture<MostPopulatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostPopulatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostPopulatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
