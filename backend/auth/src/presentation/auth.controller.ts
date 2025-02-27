import { Controller, Post, Body, Req, Logger, UseGuards } from '@nestjs/common';
import { AuthService } from '../application/auth.service';
import { SignInDto, SignUpDto } from './dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {

  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  async signUp(@Body() body: SignUpDto) {
    try {
      const { username, email, password } = body;
      const { accessToken, user } = await this.authService.signUp(email, password, username);
      return { accessToken, user };
    } catch (error) {
      this.logger.error(error);
    }
  }

  @Post('signin')
  async signIn(@Req() req: Request, @Body() body: SignInDto) {
    try {
      const { email, password } = body;
      const { accessToken, user } = await this.authService.signIn(email, password);
      return { accessToken, user };
    } catch (error) {
      this.logger.error(error);
    }
  }

  @Post('refresh')
  async refreshToken(@Body('refreshToken') refreshToken: string) {
    try {
      return this.authService.refreshToken(refreshToken);
    } catch (error) {
      this.logger.error(error);
    }
  }

  @Post('signout')
  async signout(@Req() req) {
    try {
      return this.authService.signout(req.body.user.id);
    } catch (error) {
      this.logger.error(error);
    }
  }

  //This Rout is only For demonistratoin purposes only
  @UseGuards(JwtAuthGuard)
  @Post('getUserById')
  async getUserById(@Req() req) {
    try {
      return this.authService.getUserById(req.body.user.id);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
