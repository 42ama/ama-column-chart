import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResizableContainerBoxComponent } from './resizable-container-box.component';

describe('ResizableContainerBoxComponent', () => {
  let component: ResizableContainerBoxComponent;
  let fixture: ComponentFixture<ResizableContainerBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResizableContainerBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResizableContainerBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
