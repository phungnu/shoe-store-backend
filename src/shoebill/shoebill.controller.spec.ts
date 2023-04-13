import { Test, TestingModule } from '@nestjs/testing';
import { ShoebillController } from './shoebill.controller';

describe('ShoebillController', () => {
  let controller: ShoebillController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShoebillController],
    }).compile();

    controller = module.get<ShoebillController>(ShoebillController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
