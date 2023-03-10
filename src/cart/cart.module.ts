import { UserModuleModule } from '../user/user.module';
import { ShoesModule } from './../Shoes/Shoes.module';
import { UserService } from '../user/user';
import { ShoesService } from './../Shoes/Shoes.service';
import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';

@Module({
  controllers: [CartController],
  providers: [CartService],
  imports: [ShoesModule, UserModuleModule]
})
export class CartModule {}
