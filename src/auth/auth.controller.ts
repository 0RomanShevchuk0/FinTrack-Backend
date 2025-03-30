import { Controller, Post, Body, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Response, Request } from 'express';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: LoginDto, @Res() res: Response) {
    const { user, accessToken, refreshToken } = await this.authService.login(
      body.email,
      body.password,
    );

    this.authService.addRefreshTokenToResponse(res, refreshToken);

    return res.json({ user, accessToken });
  }

  @Post('register')
  async register(@Body() body: RegisterDto, @Res() res: Response) {
    const { user, accessToken, refreshToken } =
      await this.authService.register(body);

    this.authService.addRefreshTokenToResponse(res, refreshToken);

    return res.json({ user, accessToken });
  }

  @Post('refresh')
  async refresh(@Req() req: Request, @Res() res: Response) {
    const refreshTokenFromCookies =
      req.cookies[this.authService.REFRESH_TOKEN_NAME];

    const { user, accessToken } = await this.authService.refresh(
      refreshTokenFromCookies,
    );

    return res.json({ user, accessToken });
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    this.authService.removeRefreshTokenFromResponse(res);
    return true;
  }
}
