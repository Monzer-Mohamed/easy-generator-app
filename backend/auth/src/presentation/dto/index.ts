import { ApiProperty } from '@nestjs/swagger';
export class SignInDto {
  @ApiProperty({ example: 'user@example.com', description: 'User email' })
  email: string;
  @ApiProperty({ example: 'password123', description: 'User password' })

  password: string;
}

export class SignUpDto {
  email: string;
  password: string;
  username: string;
}
