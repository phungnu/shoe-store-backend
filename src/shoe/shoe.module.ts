import { Module } from '@nestjs/common';
import { ShoeController } from './shoe.controller';
import { ShoeService } from './shoe.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shoe } from './shoe.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Shoe])],
  exports: [TypeOrmModule.forFeature([Shoe])],
  controllers: [ShoeController],
  providers: [ShoeService]
})
export class ShoeModule {}
