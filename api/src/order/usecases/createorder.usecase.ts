import { Injectable } from "@nestjs/common";
import { OrderRepository } from "../order.repository";
import { Order } from "../order.entity";
import { CreateOrderDTO } from "../dto/createorder.dto";
import { GetClientByCpfuseCase } from "../../client/usecases/getClientByCpf.useCase";
import { GetProductsByCodeuseCase } from "../../product/usecases/getproductsbycode.usecase";
import { Client } from "../../client/client.entity";
import { ItemCart } from "../../cart/itemcart.entity";
import * as jwt from "jsonwebtoken"
@Injectable()
export class CreateOrderuseCase {

    constructor(
        private orderRepository: OrderRepository,
        private getClientByCpfuseCase: GetClientByCpfuseCase,
        private getProductsByCodeuseCase: GetProductsByCodeuseCase
    ) { }


    async handle(orderDto: CreateOrderDTO, authorization: string): Promise<Order> {
        var order = new Order();
        order.observation = orderDto.observation;
        order.cart = orderDto.cart;       
        order.dateTime = Date.now().toString()
        let client = this.getClient(authorization)
        order.cart.itens = await this.getExistentProducts(orderDto.cart.itens);
        order.client = await this.getExistentClient(client);
        return await this.orderRepository.save(order);
      }

      private getClient(authorization: string): Client {
        let clientGuest = new Client()
        clientGuest.cpf = "11111111111"
        clientGuest.name = "Visitante"
        clientGuest.email = "visitante@email.com"
        if (authorization == undefined) {
          return clientGuest
        }
        const encodedTokenAux = authorization.split(' ')
        if (encodedTokenAux.length < 2) {
          return clientGuest
        }
        const encodedToken = encodedTokenAux[1]
        let decoded: any
        try {
          decoded = jwt.verify(encodedToken, 'c29hdGxhbWJkYXNlY3JldA==');
        } catch(e) {
          return clientGuest
        }
        if (decoded == null) {
          return clientGuest
        }
        var jwtDecoded = <Client> decoded 
        let client = new Client()
        client.id = jwtDecoded.id
        client.name = jwtDecoded.name
        client.cpf = jwtDecoded.cpf
        client.email = jwtDecoded.email
        return client
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