import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './presentation/auth.controller';
import { AuthService } from './application/auth.service';
import { UserRepository } from './domain/user.repository';
import { JwtStrategy, JwtConfigModule } from './strategies/jwt.strategy';
import { User, UserSchema } from './domain/user.schema';
import { APP_PIPE } from '@nestjs/core';
import { authSchema } from './config/schemas';
import { ValidateRequestPipe } from './pipes/validateRequest.pipe';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(`${process.env.MONGO_URI}`),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtConfigModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserRepository,
    JwtStrategy,
    {
      provide: APP_PIPE,
      useFactory: () => new ValidateRequestPipe(authSchema),
    },
  ],
})
export class AppModule { }
