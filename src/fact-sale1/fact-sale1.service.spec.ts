import { Test, TestingModule } from '@nestjs/testing';
import { FactSale1Service } from './fact-sale1.service';

describe('FactSale1Service', () => {
  let service: FactSale1Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FactSale1Service],
    }).compile();

    service = module.get<FactSale1Service>(FactSale1Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
