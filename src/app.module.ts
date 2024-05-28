import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { ShoeModule } from './shoe/shoe.module';
import { BillModule } from './bill/bill.module';
import { ShoebillModule } from './shoebill/shoebill.module';
import { Shoe } from './shoe/shoe.entity';
import { ShoeBill } from './shoebill/shoebill.entity';
import { Bill } from './bill/bill.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';
import { CitiesModule } from './cities/cities.module';
import { FactSale1Module } from './fact-sale1/fact-sale1.module';
import { FactSale2Module } from './fact-sale2/fact-sale2.module';
import { FactSale3Module } from './fact-sale3/fact-sale3.module';
import { FactSale1 } from './fact-sale1/fact-sale1.entity';
import { FactSale2 } from './fact-sale2/fact-sale2.entity';
import { FactSale3 } from './fact-sale3/fact-sale3.entity';

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'mysql',
			host: 'localhost',
			username: 'root',
			password: 'root',
			database: 'thuctapcoso',
			entities: [User, Shoe, ShoeBill, Bill, FactSale1, FactSale2, FactSale3],
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
		ShoebillModule,
		CitiesModule,
		FactSale1Module,
		FactSale2Module,
		FactSale3Module
	],
	controllers: [
		AppController
	],
	providers: [AppService, AuthService],
})
export class AppModule {}

