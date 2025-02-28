import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_SECRET', 'default_secret'),
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, role: payload.role };
  }
}

export const JwtConfigModule = JwtModule.registerAsync({
  imports: [],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService): Promise<JwtModuleOptions> => ({
    secret: configService.get<string>('JWT_SECRET'),
    signOptions: { expiresIn: '30m' },
  }),
});
