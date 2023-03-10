import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModuleModule } from './user-module/user-module.module';
import { PhoneModule } from './phone/phone.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [
    UserModuleModule,
    ConfigModule.forRoot({
      ignoreEnvFile: true,
    }),
    PhoneModule,
    CartModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
