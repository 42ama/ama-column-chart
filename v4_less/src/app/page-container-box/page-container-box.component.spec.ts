import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageContainerBoxComponent } from './page-container-box.component';

describe('PageContainerBoxComponent', () => {
  let component: PageContainerBoxComponent;
  let fixture: ComponentFixture<PageContainerBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageContainerBoxComponent]
    });
    fixture = TestBed.createComponent(PageContainerBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
