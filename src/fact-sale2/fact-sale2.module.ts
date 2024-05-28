import { Module } from '@nestjs/common';
import { FactSale2Service } from './fact-sale2.service';
import { FactSale2Controller } from './fact-sale2.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FactSale2 } from './fact-sale2.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FactSale2])],
  exports: [TypeOrmModule.forFeature([FactSale2])],
  providers: [FactSale2Service],
  controllers: [FactSale2Controller]
})
export class FactSale2Module {}
