import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../product/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, OneToOne, JoinColumn, JoinTable } from 'typeorm';
import { Cart } from './cart.entity';

@Entity()
export class ItemCart {

  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @ManyToOne(() => Cart, (cart) => cart.itens)
  cart: Cart;

  @ManyToOne(() => Product, (cart) => cart.itemCart,
  {
    cascade: true,
  })
  @ApiProperty()
  product: Product;

  @Column()
  @ApiProperty()
  count: number;

  @Column()
  @ApiProperty()
  observation: string;

}