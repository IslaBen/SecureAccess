import { TestBed } from '@angular/core/testing';

import { LoadingPageService } from './loading-page.service';

describe('LoadingPageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoadingPageService = TestBed.get(LoadingPageService);
    expect(service).toBeTruthy();
  });
});
