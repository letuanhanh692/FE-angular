<<<<<<< HEAD
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
=======
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TriptodayComponent } from './triptoday.component';

describe('TriptodayComponent', () => {
  let component: TriptodayComponent;
  let fixture: ComponentFixture<TriptodayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TriptodayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TriptodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
>>>>>>> develop/duong
