import { ApiProperty } from '@nestjs/swagger';
import { Order } from '../order/order.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinTable } from 'typeorm';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  cpf: string;

  @Column()
  @ApiProperty()
  email: string;

  @OneToMany(type => Order, order => order.client)
  @JoinTable()
  orders: Order[];
}