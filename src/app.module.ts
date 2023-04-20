import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { ShoeModule } from './shoe/shoe.module';
import { BillModule } from './bill/bill.module';
import { CustomerModule } from './customer/customer.module';
import { ShoebillModule } from './shoebill/shoebill.module';
import { Customer } from './customer/customer.entity';
import { Shoe } from './shoe/shoe.entity';
import { ShoeBill } from './shoebill/shoebill.entity';
import { Bill } from './bill/bill.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'mysql',
			host: 'localhost',
			username: 'root',
			password: 'root',
			database: 'thuctapcoso',
			entities: [Customer, User, Shoe, ShoeBill, Bill],
			synchronize: true,
		}),
		JwtModule.register({
			secret: 'scre',
			signOptions: {
				expiresIn: '4h'
			}
		}),
		UserModule,
		ShoeModule,
		BillModule,
		CustomerModule,
		ShoebillModule
	],
	controllers: [
		AppController
	],
	providers: [AppService, AuthService],
})
export class AppModule {}

