import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) { }

  async findByEmail(email: string): Promise<User | null> {
    try {
      return this.userModel.findOne({ email }).exec();
    } catch (error) { throw error }
  }

  async createUser(email: string, hashedPassword: string, username: string): Promise<User> {
    try {
      const user = new this.userModel({ email, password: hashedPassword, username });
      return user.save();
    } catch (error) { throw error }
  }

  async findById(_id: string) {
    try {
      return this.userModel.findOne({ _id }).exec();
    } catch (error) { throw error }
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    try {
      return this.userModel.findByIdAndUpdate(userId, { refreshToken }).exec();
    } catch (error) { throw error }
  }

  async findByRefreshToken(refreshToken: string): Promise<User | null> {
    try {
      return this.userModel.findOne({ refreshToken }).exec();
    } catch (error) { throw error }
  }
}
