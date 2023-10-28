import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClickableContainerBoxComponent } from './clickable-container-box.component';

describe('ClickableContainerBoxComponent', () => {
  let component: ClickableContainerBoxComponent;
  let fixture: ComponentFixture<ClickableContainerBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClickableContainerBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClickableContainerBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
