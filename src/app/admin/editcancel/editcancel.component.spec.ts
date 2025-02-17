import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcancelComponent } from './editcancel.component';

describe('EditcancelComponent', () => {
  let component: EditcancelComponent;
  let fixture: ComponentFixture<EditcancelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditcancelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditcancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
