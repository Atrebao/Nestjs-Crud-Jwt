import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from './role.ennum';
import { User } from './users.entity';
import { CreateUserDto } from '../dto/users.dto'

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {

  }

  @Get('rechercher-users')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Post('enregistrer-user')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async createUser(@Body() userDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(userDto.username, userDto.password, userDto.role, userDto.name, userDto.numero);
  }
}
