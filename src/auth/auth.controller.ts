import { Controller, Post, Body, Request,Headers,Get, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { IdentifiantDto } from 'src/dto/identifiants.dto';

@Controller('auth')
export class AuthController {

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {

  }

  /*
  @Post('signup')
  async signUp(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    return this.usersService.createUser(username, password);
  }
*/
  /*
     @Post('signin')
     async signIn(@Request() req) {
       const user = await this.authService.validateUser(req.body.username, req.body.password);
       if (!user) {
         throw new UnauthorizedException();
       }
       return this.authService.login(user);
     }
       */

  @Post('signin')
  async signIn(@Body() identifiants: IdentifiantDto) {
    const user = await this.authService.validateUser(identifiants.username, identifiants.password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.authService.login(user);
  }

  @Get('profile')
  getProfile(@Headers('authorization') authHeader: string) {
  return `Authorization header: ${authHeader}`;
  }

}
