import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    forwardRef(() => UsersModule), // подключаю для работы с юзерами
    JwtModule.register({
      secret: "SECRET_KEY",
      signOptions: {
        expiresIn: "24h"
      }
    })
  ],
  exports: [JwtModule, AuthService]
})
export class AuthModule {}
