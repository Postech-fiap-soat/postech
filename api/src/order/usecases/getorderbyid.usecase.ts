import { Injectable, NotFoundException } from "@nestjs/common";
import { OrderRepository } from "../order.repository";

@Injectable()
export class GetOrderByIduseCase {

    constructor(
        private orderRepository: OrderRepository
    ) { }


    async handle(orderId: number){
        var storedOrder = await this.orderRepository.getById(orderId)
        
        if (!storedOrder) 
          throw new NotFoundException('Order not found!');
    
        return storedOrder;
      }

}