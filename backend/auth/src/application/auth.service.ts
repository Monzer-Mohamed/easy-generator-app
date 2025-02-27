import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../domain/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) { }

  async signUp(email: string, password: string, username) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await this.userRepository.createUser(email, hashedPassword, username);
      const { accessToken } = this.generateTokens(user.id, user.username);
      return { accessToken, user: { id: user.id, username: user.username, email: user.email } };
    } catch (error) { throw error };
  }

  async signIn(email: string, password: string) {
    try {
      const user = await this.userRepository.findByEmail(email);
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new UnauthorizedException('Invalid credentials');
      }
      const { accessToken } = this.generateTokens(user.id, user.username);
      return { accessToken, user: { id: user.id, username: user.username, email: user.email } };
    } catch (error) {
      throw error;
    }
  }

  async refreshToken(refreshToken: string) {
    try {
      const user = await this.userRepository.findByRefreshToken(refreshToken);
      if (!user) throw new UnauthorizedException('Invalid refresh token');

      return this.generateTokens(user.id, user.username);
    } catch (error) {
      throw error;
    }
  }

  async signout(userId: string) {
    try {
      await this.userRepository.updateRefreshToken(userId, "");
      return { message: 'Logged out successfully' };
    } catch (error) {
      throw error;
    }
  }

  private generateTokens(userId: string, username: string) {
    try {
      const accessToken = this.jwtService.sign({ sub: userId, username }, { expiresIn: '15m' });
      const refreshToken = this.jwtService.sign({ sub: userId, username }, { expiresIn: '7d' });
      this.userRepository.updateRefreshToken(userId, refreshToken);
      return { accessToken, refreshToken };
    } catch (error) {
      throw error;
    }
  }

  async getUserById(userId: string) {
    try {
      const user = await this.userRepository.findById(userId);
      return { user };
    } catch (error) {
      throw error;
    }
  }

}
