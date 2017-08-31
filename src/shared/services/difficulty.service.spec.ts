import { TestBed, inject } from '@angular/core/testing';

import { DifficultyService } from './difficulty.service';

describe('DifficultyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DifficultyService]
    });
  });

  it('should be created', inject([DifficultyService], (service: DifficultyService) => {
    expect(service).toBeTruthy();
  }));

  it('should return a BehaviorSubject', inject([DifficultyService], (service: DifficultyService) => {
    expect(typeof(service.getDifficulty().next)).toBe('function');
  }));
/*
  it('should set a random, even difficulty', inject([DifficultyService], (service: DifficultyService) => {
    expect(service.getDifficulty().getValue() / 2).toBe
  }));
*/
});

