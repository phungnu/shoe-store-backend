import { jwtConstants } from './constants';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserControllerController } from './user.controller';
import { UserService } from './user';

@Module({
  controllers: [UserControllerController],
  providers: [UserService],
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s'}
    })
  ],
  exports: [UserService]
})
export class UserModuleModule {}
