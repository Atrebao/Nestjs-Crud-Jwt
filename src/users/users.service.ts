import { Injectable, OnModuleInit} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { User } from '../users/users.entity';
import { UserRole } from '../users/role.ennum'
import * as bcrypt from 'bcrypt'; //npm i --save-dev @types/bcrypt
import { convertToUserRole } from '../users/role.ennum'


@Injectable()
export class UsersService implements OnModuleInit{

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private dataSource: DataSource, // Injecter DataSource pour les requêtes brutes
  ) { }

  async onModuleInit() {
    this.createUser("userbob", "password123","ADMIN", "bob", "0504668380");
  }

  async createUser(username: string, password: string, profile: string, name: string, numero: string): Promise<User> {
    const existingUser = await this.findUserByUsername(username);
    if (!existingUser) { 
      const hashedPassword = await bcrypt.hash(password, 10);
      const role = convertToUserRole(profile);
      const newUser = this.usersRepository.create({ username, password: hashedPassword, role, name, numero });
      return this.usersRepository.save(newUser);
    }
  
  }

  async updateUser(id:number, name:string, numero:string):Promise<User>{
    const user = await this.usersRepository.findOne({ where: { id } });
    if(!user){
      throw new Error('Utilisateur introuvable');
    }
    user.name = name;
    user.numero = numero;
    return this.usersRepository.save(user);
  }

  async findUserByUsername(username: string): Promise<User | undefined> {
    return await this.usersRepository.findOne({ where: { username } });
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async rechercherParUsername(username: string): Promise<any> {
    return await this.dataSource.query(
      `SELECT * FROM user WHERE username = $1`,
      [username],
    );
  }
}
