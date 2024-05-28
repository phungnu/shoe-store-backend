import { Module } from '@nestjs/common';
import { FactSale3Service } from './fact-sale3.service';
import { FactSale3Controller } from './fact-sale3.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FactSale3 } from './fact-sale3.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FactSale3])],
  exports: [TypeOrmModule.forFeature([FactSale3])],
  providers: [FactSale3Service],
  controllers: [FactSale3Controller]
})
export class FactSale3Module {}
