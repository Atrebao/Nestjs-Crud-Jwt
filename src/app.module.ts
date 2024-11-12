import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RoleService } from './role/role.service';
import { RoleController } from './role/role.controller';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'nest_crud_db',
      autoLoadEntities: true,
      synchronize: true, // à désactiver en production
    }),
    // UsersModule,
    AuthModule,
  ],
  controllers: [AppController, RoleController],
  providers: [AppService, RoleService],
})
export class AppModule {}
