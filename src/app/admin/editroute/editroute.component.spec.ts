import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditrouteComponent } from './editroute.component';

describe('EditrouteComponent', () => {
  let component: EditrouteComponent;
  let fixture: ComponentFixture<EditrouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditrouteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditrouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
