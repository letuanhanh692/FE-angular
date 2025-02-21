import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulebookingsComponent } from './schedulebookings.component';

describe('SchedulebookingsComponent', () => {
  let component: SchedulebookingsComponent;
  let fixture: ComponentFixture<SchedulebookingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchedulebookingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SchedulebookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
