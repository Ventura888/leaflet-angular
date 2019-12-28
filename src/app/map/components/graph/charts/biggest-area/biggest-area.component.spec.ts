import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiggestAreaComponent } from './biggest-area.component';

describe('BiggestAreaComponent', () => {
  let component: BiggestAreaComponent;
  let fixture: ComponentFixture<BiggestAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiggestAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiggestAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
