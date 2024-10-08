import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfCreatorComponent } from './pdf-creator.component';

describe('PdfCreatorComponent', () => {
  let component: PdfCreatorComponent;
  let fixture: ComponentFixture<PdfCreatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PdfCreatorComponent]
    });
    fixture = TestBed.createComponent(PdfCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
