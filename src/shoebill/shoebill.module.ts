import { Module } from '@nestjs/common';
import { ShoebillController } from './shoebill.controller';
import { ShoebillService } from './shoebill.service';

@Module({
  controllers: [ShoebillController],
  providers: [ShoebillService]
})
export class ShoebillModule {}
