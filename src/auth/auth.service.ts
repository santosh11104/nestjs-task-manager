import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
const expiresAt = new Date();
expiresAt.setDate(expiresAt.getDate() + 7);


import { RefreshToken } from './entities/refresh-token.entity';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,

    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepo: Repository<RefreshToken>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) { }

  // ===================== EXISTING METHODS =====================

  async login(body: any) {
    const user = await this.validateUser(body);
    return this.generateTokens(user);
  }

  async register(body: any) {
    // keep your existing register logic here
    return { success: true };
  }

  async validateUser(body: any) {
    const user = await this.userRepo.findOne({
      where: { email: body.email },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    const valid = await bcrypt.compare(body.password, user.password);
    if (!valid) {
      throw new UnauthorizedException();
    }

    return user;
  }

  // ===================== ADDED METHODS (INSIDE CLASS) =====================

  async generateTokens(user: User) {
    const payload = { sub: user.id, role: user.role };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '15m',
    });

    const refreshToken = randomUUID();
    const tokenHash = await bcrypt.hash(refreshToken, 10);

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await this.refreshTokenRepo.save({
      userId: user.id,      // ✅ number → number
      tokenHash,
      expiresAt,
    });

    return { accessToken, refreshToken };
  }

  async refreshTokens(refreshToken: string) {
    const tokens = await this.refreshTokenRepo.find();

    for (const token of tokens) {
      const match = await bcrypt.compare(refreshToken, token.tokenHash);

      if (match && token.expiresAt > new Date()) {
        await this.refreshTokenRepo.delete(token.id);

        const user = await this.userRepo.findOneBy({
          id: token.userId,   // ✅ number → number
        });

        if (!user) {
          throw new UnauthorizedException('User not found');
        }

        return this.generateTokens(user);
      }
    }

    throw new UnauthorizedException('Invalid refresh token');
  }



  async logout(userId: number) {
    await this.refreshTokenRepo.delete({ userId });
    return { success: true };
  }

}
