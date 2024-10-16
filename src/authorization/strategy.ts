import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { log } from 'console';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // This extracts JWT from the Authorization header
      ignoreExpiration: false, // Ensure the JWT has not expired
      secretOrKey: 'yourSecretKey', // Ensure this matches the secret used when generating the token
    });
  }

  async validate(payload: any) {
   console.log('Decoded token payload:', payload); // Add this log
    return { userid: payload.sub, email: payload.email }; // Adjust fields according to your token structure
  }
}
