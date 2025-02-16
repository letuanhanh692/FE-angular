import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutstaffComponent } from './layoutstaff.component';

describe('LayoutstaffComponent', () => {
  let component: LayoutstaffComponent;
  let fixture: ComponentFixture<LayoutstaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutstaffComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LayoutstaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
