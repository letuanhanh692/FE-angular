import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditbusComponent } from './editbus.component';

describe('EditbusComponent', () => {
  let component: EditbusComponent;
  let fixture: ComponentFixture<EditbusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditbusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditbusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
