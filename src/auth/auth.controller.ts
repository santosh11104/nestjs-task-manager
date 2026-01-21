import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // ✅ EXISTING LOGIN (KEEP YOUR LOGIC)
  @Post('login')
  login(@Body() body: any) {
    return this.authService.login(body);
  }

  // ✅ EXISTING REGISTER (KEEP YOUR LOGIC)
  @Post('register')
  register(@Body() body: any) {
    return this.authService.register(body);
  }

  // ===================== ADDED METHODS (INSIDE CLASS) =====================

  @Post('refresh')
  refresh(@Body('refreshToken') token: string) {
    return this.authService.refreshTokens(token);
  }

  @Post('logout')
@UseGuards(AuthGuard('jwt'))
logout(@Req() req: any) {
  return this.authService.logout(req.user.sub);
}


}
