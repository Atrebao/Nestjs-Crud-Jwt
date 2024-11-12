import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module'; // Importer le module des utilisateurs
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../constants/constant';
import { JwtStrategy } from './jwt.strategy';


@Module({
  imports: [
    UsersModule,
    JwtModule.register({ 
      global: true,
      secret: jwtConstants.secret, 
      signOptions: { expiresIn: '60s' } 
    }), ], 
  providers: [AuthService, JwtService, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
