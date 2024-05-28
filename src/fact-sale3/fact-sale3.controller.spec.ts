import { Test, TestingModule } from '@nestjs/testing';
import { FactSale3Controller } from './fact-sale3.controller';

describe('FactSale3Controller', () => {
  let controller: FactSale3Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FactSale3Controller],
    }).compile();

    controller = module.get<FactSale3Controller>(FactSale3Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
