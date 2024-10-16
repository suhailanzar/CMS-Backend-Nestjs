import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './auth.dto';
import { signUpDto } from './auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../model/userModel'; 
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { sign } from 'crypto';
import { exec } from 'child_process';


@Injectable()
export class AuthorizationService {

      constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
      private readonly jwtservice:JwtService
  ) {}


  async signUp(signUpDto: signUpDto): Promise<string> {
    const { username, email, password } = signUpDto;

    // Check if user already exists
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new this.userModel({
      username,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    // Return success message
    return 'User created successfully';
  }
  
  

  async login(loginDto: LoginDto): Promise<{message:string, userdata: any; accessToken: string }> {
    const { email, password } = loginDto;
  
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('User Not Found');
    }
    
  
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
  
    const payload = { email: user.email, sub: user._id };
    const accessToken = this.jwtservice.sign(payload);
  
    const userData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };
  
    return {
      message:"login successfull",
      userdata: userData,
      accessToken,
    };
  }


    async findById(userId: string): Promise<User> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return user;
  }
  
}

