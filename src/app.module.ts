import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModuleModule } from './user/user.module';
import { ShoesModule } from './shoes/shoes.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [
    UserModuleModule,
    ConfigModule.forRoot({
      ignoreEnvFile: true,
    }),
    ShoesModule,
    CartModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
