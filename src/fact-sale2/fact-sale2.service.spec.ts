import { Test, TestingModule } from '@nestjs/testing';
import { FactSale2Service } from './fact-sale2.service';

describe('FactSale2Service', () => {
  let service: FactSale2Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FactSale2Service],
    }).compile();

    service = module.get<FactSale2Service>(FactSale2Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
