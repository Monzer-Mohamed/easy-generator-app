import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {

  private readonly logger = new Logger(JwtStrategy.name);

  constructor(private readonly configService: ConfigService, logger: Logger) {
    try {
      const secret = configService.get<string>('JWT_SECRET'); 
      if (!secret) {
        throw new Error('JWT_SECRET is not defined in environment variables');
      }

      super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: secret, // Ensured to be a string
      });
    } catch (error) {
      logger.error(error);
    }
  }

  async validate(payload: { sub: string; email: string; roles?: string[] }) {
    try {
      if (!payload) {
        throw new UnauthorizedException('Invalid token');
      }
      return { userId: payload.sub, email: payload.email, roles: payload.roles || [] };
    } catch (error) {
      this.logger.error(error);
    }
  } 
} 