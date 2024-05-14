import { Module } from '@nestjs/common';
import { ShoebillController } from './shoebill.controller';
import { ShoebillService } from './shoebill.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoeBill } from './shoebill.entity';
import { ShoeModule } from 'src/shoe/shoe.module';
import { UserModule } from 'src/user/user.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([ShoeBill]),
		ShoeModule, 
		UserModule
	],
	providers: [ShoebillService],
	controllers: [ShoebillController],
	exports: [TypeOrmModule.forFeature([ShoeBill])],
})
export class ShoebillModule {}
