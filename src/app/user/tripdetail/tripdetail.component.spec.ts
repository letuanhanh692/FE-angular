import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripdetailComponent } from './tripdetail.component';

describe('TripdetailComponent', () => {
  let component: TripdetailComponent;
  let fixture: ComponentFixture<TripdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripdetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TripdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
