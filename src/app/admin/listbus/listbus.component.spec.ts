import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListbusComponent } from './listbus.component';

describe('ListbusComponent', () => {
  let component: ListbusComponent;
  let fixture: ComponentFixture<ListbusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListbusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListbusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
