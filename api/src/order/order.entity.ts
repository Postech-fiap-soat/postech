import { Cart } from '../cart/cart.entity';
import { Client } from '../client/client.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, OneToOne, JoinColumn } from 'typeorm';

export enum PaymentStatusOrder {
  NAO_REALIZADO = 1,
  APROVADO = 2,
  RECUSADO = 3,
}

export enum StatusOrder {
  RECEBIDO = 1,
  EM_PREPARACAO = 2,
  PRONTO = 3,
  FINALIZADO = 4,
}

@Entity()
export class Order {

  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Cart, { cascade: true })
  @JoinColumn()
  cart: Cart;

  @ManyToOne(() => Client, (client) => client.orders, {
    cascade: true
  })
  client: Client;

  @Column({type: 'bigint'})
  dateTime: string;

  @Column({
    type: "enum",
    enum: StatusOrder,
    default: StatusOrder.RECEBIDO
})
  status: StatusOrder;

  @Column({
    type: "enum",
    enum: PaymentStatusOrder,
    default: PaymentStatusOrder.NAO_REALIZADO
})
  paymentstatus: PaymentStatusOrder;

  @Column({
    nullable: true
  })
  observation: string;

  totalPrice: number;


  public setStatus(status: StatusOrder) {
    this.status = status;
  }

  public getTotalPrice() {
    if(!this.cart || !this.cart.itens)
      throw new Error("itens car are empty, we cannot calculate total price.");

    return this.cart.itens.reduce((sum, current) => sum + current.product.price, 0);
  }
}