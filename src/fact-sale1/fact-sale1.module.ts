import { Module } from '@nestjs/common';
import { FactSale1Service } from './fact-sale1.service';
import { FactSale1Controller } from './fact-sale1.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FactSale1 } from './fact-sale1.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FactSale1])],
  exports: [TypeOrmModule.forFeature([FactSale1])],
  providers: [FactSale1Service],
  controllers: [FactSale1Controller]
})
export class FactSale1Module {}
