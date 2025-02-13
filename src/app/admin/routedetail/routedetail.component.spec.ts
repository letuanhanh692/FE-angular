import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutedetailComponent } from './routedetail.component';

describe('RoutedetailComponent', () => {
  let component: RoutedetailComponent;
  let fixture: ComponentFixture<RoutedetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoutedetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoutedetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
