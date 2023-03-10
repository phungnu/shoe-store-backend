import { UserModuleModule } from './../user-module/user-module.module';
import { PhoneModule } from './../phone/phone.module';
import { UserService } from './../user-module/user-service';
import { PhoneService } from './../phone/phone.service';
import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';

@Module({
  controllers: [CartController],
  providers: [CartService],
  imports: [PhoneModule, UserModuleModule]
})
export class CartModule {}
