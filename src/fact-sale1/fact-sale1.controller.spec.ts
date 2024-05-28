import { Test, TestingModule } from '@nestjs/testing';
import { FactSale1Controller } from './fact-sale1.controller';

describe('FactSale1Controller', () => {
  let controller: FactSale1Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FactSale1Controller],
    }).compile();

    controller = module.get<FactSale1Controller>(FactSale1Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
