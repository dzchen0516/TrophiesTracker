import { TestBed } from '@angular/core/testing';

import { TrophyServiceService } from './trophy-service.service';

describe('TrophyServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TrophyServiceService = TestBed.get(TrophyServiceService);
    expect(service).toBeTruthy();
  });
});
