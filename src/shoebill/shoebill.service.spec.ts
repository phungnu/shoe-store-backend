import { Test, TestingModule } from '@nestjs/testing';
import { ShoebillService } from './shoebill.service';

describe('ShoebillService', () => {
  let service: ShoebillService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShoebillService],
    }).compile();

    service = module.get<ShoebillService>(ShoebillService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
