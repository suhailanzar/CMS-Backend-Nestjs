import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { AuthorizationService } from './authorization.service'
import { LoginDto, signUpDto } from './auth.dto';


@Controller('authorization')
export class AuthorizationController {

  constructor(private readonly authService: AuthorizationService) { }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<{message:string,userdata:any, accessToken: string }> {
    return this.authService.login(loginDto);
  }

  @Post('signUp')
  async signUp(@Body() signUpDto: signUpDto): Promise<{ message: string }> {
    const result = await this.authService.signUp(signUpDto);
    return { message: result };
  }


}
