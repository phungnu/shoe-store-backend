import { Module, forwardRef } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './customer.entity';
import { BillModule } from '../bill/bill.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([Customer]),
		forwardRef(() => BillModule)
	],
	controllers: [CustomerController],
	providers: [CustomerService],
	exports: [TypeOrmModule.forFeature([Customer])],
})
export class CustomerModule {}
