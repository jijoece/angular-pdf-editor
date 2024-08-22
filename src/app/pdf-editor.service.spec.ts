import { TestBed } from '@angular/core/testing';

import { PdfEditorService } from './pdf-editor.service';

describe('PdfEditorService', () => {
  let service: PdfEditorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PdfEditorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
