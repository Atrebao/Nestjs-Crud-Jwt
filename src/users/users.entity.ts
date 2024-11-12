import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from './role.ennum';

@Entity()
export class User{

    @PrimaryGeneratedColumn()
    id:number;

    @Column({ unique: true })
    username: string;

    @Column()
    name:string;

    @Column()
    numero:string;
  
    @Column()
    password: string;
  
    @Column({
      type: 'enum',
      enum: UserRole,
      default: UserRole.USER,
    })
    role: UserRole;

}