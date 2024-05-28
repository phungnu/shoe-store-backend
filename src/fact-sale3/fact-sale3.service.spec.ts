import { Test, TestingModule } from '@nestjs/testing';
import { FactSale3Service } from './fact-sale3.service';

describe('FactSale3Service', () => {
  let service: FactSale3Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FactSale3Service],
    }).compile();

    service = module.get<FactSale3Service>(FactSale3Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
