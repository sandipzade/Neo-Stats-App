import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AsteroidsService } from './asteroids.service';

describe('AsteroidsService', () => {
  let service: AsteroidsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AsteroidsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
