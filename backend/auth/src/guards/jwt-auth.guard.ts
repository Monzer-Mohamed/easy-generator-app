import { Injectable, ExecutionContext, UnauthorizedException, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name);

  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user, info, context: ExecutionContext) {
 
      const request = context.switchToHttp().getRequest<Request>(); 
      if (err || !user) {
        const token = request.headers.authorization || 'No token provided';
        this.logger.warn(`JWT authentication failed for request ${request.method} ${request.url}. Token: ${token}`);
        throw new UnauthorizedException('Invalid or missing JWT token');
      } 
      return user; 
  }
}
