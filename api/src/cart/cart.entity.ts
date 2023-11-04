import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, OneToOne, JoinColumn, JoinTable } from 'typeorm';
import { ItemCart } from './itemcart.entity';

@Entity()
export class Cart {

  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @OneToMany(type => ItemCart, itemCart => itemCart.cart, {
    cascade: true,
  })
  @JoinTable()
  @ApiProperty({ 
    type: ItemCart,
    isArray: true
  })
  itens: ItemCart[];


}

