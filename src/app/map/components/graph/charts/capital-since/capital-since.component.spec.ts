import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapitalSinceComponent } from './capital-since.component';

describe('CapitalSinceComponent', () => {
  let component: CapitalSinceComponent;
  let fixture: ComponentFixture<CapitalSinceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapitalSinceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapitalSinceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
