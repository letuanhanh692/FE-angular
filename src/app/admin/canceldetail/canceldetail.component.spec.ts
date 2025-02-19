import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanceldetailComponent } from './canceldetail.component';

describe('CanceldetailComponent', () => {
  let component: CanceldetailComponent;
  let fixture: ComponentFixture<CanceldetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CanceldetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CanceldetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
