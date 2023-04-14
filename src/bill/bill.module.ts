import { Module } from '@nestjs/common';
import { BillController } from './bill.controller';
import { BillService } from './bill.service';
import { Bill } from './bill.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoebillService } from 'src/shoebill/shoebill.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([Bill]),
	],
	exports: [TypeOrmModule.forFeature([Bill])],
	controllers: [BillController],
	providers: [BillService]
})
export class BillModule {}
