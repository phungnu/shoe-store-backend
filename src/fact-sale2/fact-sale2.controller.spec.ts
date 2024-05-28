import { Test, TestingModule } from '@nestjs/testing';
import { FactSale2Controller } from './fact-sale2.controller';

describe('FactSale2Controller', () => {
  let controller: FactSale2Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FactSale2Controller],
    }).compile();

    controller = module.get<FactSale2Controller>(FactSale2Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
