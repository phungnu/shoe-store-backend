import { Module } from '@nestjs/common';
import { ShoebillController } from './shoebill.controller';
import { ShoebillService } from './shoebill.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoeBill } from './shoebill.entity';
import { ShoeModule } from 'src/shoe/shoe.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([ShoeBill]),
		ShoeModule
	],
	providers: [ShoebillService],
	controllers: [ShoebillController],
})
export class ShoebillModule {}
