import { Injectable } from "@nestjs/common";
import { OrderRepository } from "../order.repository";
import { Order } from "../order.entity";

@Injectable()
export class GetOrdersByStatususeCase {

    constructor(
        private orderRepository: OrderRepository
    ) { }


    async handle(status: string): Promise<Order[]> {
        return await this.orderRepository.getByStatus(status);
      }

}