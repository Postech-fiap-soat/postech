import { Injectable } from "@nestjs/common";
import { OrderRepository } from "../order.repository";
import { Order } from "../order.entity";

@Injectable()
export class GetOrdersUnfinisheduseCase {

    constructor(
        private orderRepository: OrderRepository
    ) { }


    async handle(): Promise<Order[]> {

        let orders = await this.orderRepository.getAllUnfinished();
    
        return orders.sort((order1, order2) => {
          if(order1.status > order2.status)
            return -1
          return 1;
        })
      }

}