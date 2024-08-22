import { TestBed } from '@angular/core/testing';

import { PdfUtilService } from './pdf-util.service';

describe('PdfUtilService', () => {
  let service: PdfUtilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PdfUtilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
