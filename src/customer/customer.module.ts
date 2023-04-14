import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './customer.entity';
import { BillModule } from '../bill/bill.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([Customer]),
		BillModule
	],
	controllers: [CustomerController],
	providers: [CustomerService]
})
export class CustomerModule {}
