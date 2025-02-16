import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListmanagentComponent } from './listmanagent.component';

describe('ListmanagentComponent', () => {
  let component: ListmanagentComponent;
  let fixture: ComponentFixture<ListmanagentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListmanagentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListmanagentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
