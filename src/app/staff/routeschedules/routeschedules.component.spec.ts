import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteschedulesComponent } from './routeschedules.component';

describe('RouteschedulesComponent', () => {
  let component: RouteschedulesComponent;
  let fixture: ComponentFixture<RouteschedulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouteschedulesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RouteschedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
