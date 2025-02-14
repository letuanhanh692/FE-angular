import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchtripComponent } from './searchtrip.component';

describe('SearchtripComponent', () => {
  let component: SearchtripComponent;
  let fixture: ComponentFixture<SearchtripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchtripComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchtripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
