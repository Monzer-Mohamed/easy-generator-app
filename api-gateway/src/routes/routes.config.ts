
import { ConfigService } from '@nestjs/config';
const configService = new ConfigService();
export const routes = [
    {
      path: 'auth',
      service: 'http://localhost:4000/auth',
      endpoints: ['signin', 'signup', 'refresh', 'logout'],
      isPublic: true, 
    },
    {
      path: 'users',
      service: 'USER_SERVICE',
      endpoints: ['get', 'update', 'delete'],
      roles: ['admin', 'manager'],  
    }
  ];
  