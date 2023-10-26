import { TestBed } from '@angular/core/testing';

import { ParagraphControlService } from './paragraph-control.service';

describe('ParagraphControlService', () => {
  let service: ParagraphControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParagraphControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
