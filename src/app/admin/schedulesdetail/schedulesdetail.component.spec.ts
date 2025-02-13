import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulesdetailComponent } from './schedulesdetail.component';

describe('SchedulesdetailComponent', () => {
  let component: SchedulesdetailComponent;
  let fixture: ComponentFixture<SchedulesdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchedulesdetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SchedulesdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
