import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshToken } from './entities/refresh-token.entity';
@Module({
  imports: [
    UsersModule,                      // ✅ <-- REQUIRED
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'default_secret',
      signOptions: { expiresIn: '1d' },
    }),
    TypeOrmModule.forFeature([RefreshToken]),

  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

