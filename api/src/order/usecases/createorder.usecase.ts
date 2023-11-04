import { Injectable } from "@nestjs/common";
import { OrderRepository } from "../order.repository";
import { Order } from "../order.entity";
import { CreateOrderDTO } from "../dto/createorder.dto";
import { GetClientByCpfuseCase } from "../../client/usecases/getClientByCpf.useCase";
import { GetProductsByCodeuseCase } from "../../product/usecases/getproductsbycode.usecase";
import { Client } from "../../client/client.entity";
import { ItemCart } from "../../cart/itemcart.entity";

@Injectable()
export class CreateOrderuseCase {

    constructor(
        private orderRepository: OrderRepository,
        private getClientByCpfuseCase: GetClientByCpfuseCase,
        private getProductsByCodeuseCase: GetProductsByCodeuseCase
    ) { }


    async handle(orderDto: CreateOrderDTO): Promise<Order> {

        var order = new Order();
        order.observation = orderDto.observation;
        order.cart = orderDto.cart;
        order.client = orderDto.client;
        order.dateTime = Date.now().toString()
    
        order.cart.itens = await this.getExistentProducts(orderDto.cart.itens);
        order.client = await this.getExistentClient(orderDto.client);
    
        return await this.orderRepository.save(order);
      }



      private async getExistentProducts(itensCard: ItemCart[]): Promise<ItemCart[]> {
        for (const itemCart of itensCard) {
    
          var product = await this.getProductsByCodeuseCase.handle(itemCart.product.code);
    
          if (product) {
            itemCart.product = product;
          }
        }
    
        return itensCard;
      }
    
      private async getExistentClient(client: Client) {
    
        var clientExist = await this.getClientByCpfuseCase.handle(client.cpf);
    
        if (clientExist)
          client = clientExist
    
        return client;
    
      }

}