import { UserModuleModule } from '../user/user.module';
import { ShoesModule } from './../shoes/shoes.module';
import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';

@Module({
  controllers: [CartController],
  providers: [CartService],
  imports: [ShoesModule, UserModuleModule]
})
export class CartModule {}
