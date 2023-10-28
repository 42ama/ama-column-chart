import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResizableContainerBoxControllerComponent } from './resizable-container-box-controller.component';

describe('ResizableContainerBoxControllerComponent', () => {
  let component: ResizableContainerBoxControllerComponent;
  let fixture: ComponentFixture<ResizableContainerBoxControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResizableContainerBoxControllerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResizableContainerBoxControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
