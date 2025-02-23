import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripTodayComponent } from './triptoday.component';

describe('TriptodayComponent', () => {
  let component: TripTodayComponent;
  let fixture: ComponentFixture<TripTodayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripTodayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripTodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
