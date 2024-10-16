import { Module } from '@nestjs/common';
import { AuthorizationController } from './authorization.controller';
import { AuthorizationService } from './authorization.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'model/userModel';
import { JwtModule } from '@nestjs/jwt';
import { register } from 'module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: 'yourSecretKey', 
      signOptions: { expiresIn: '1h' }, 
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }), 


  ],
  controllers: [AuthorizationController],
  providers: [AuthorizationService,JwtStrategy],
  exports: [JwtModule, PassportModule],
})
export class AuthorizationModule { }
