import { Module } from '@nestjs/common';
import { BillController } from './bill.controller';
import { BillService } from './bill.service';
import { Bill } from './bill.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoebillService } from 'src/shoebill/shoebill.service';
import { ShoeModule } from 'src/shoe/shoe.module';
import { ShoebillModule } from 'src/shoebill/shoebill.module';
import { UserModule } from 'src/user/user.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([Bill]),
		ShoeModule,
		ShoebillModule,
		UserModule
	],
	exports: [TypeOrmModule.forFeature([Bill])],
	controllers: [BillController],
	providers: [BillService]
})
export class BillModule {}
