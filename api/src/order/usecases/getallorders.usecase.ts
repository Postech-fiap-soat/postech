import { Injectable } from "@nestjs/common";
import { OrderRepository } from "../order.repository";
import { Order } from "../order.entity";

@Injectable()
export class GetAllOrdersuseCase {

    constructor(
        private orderRepository: OrderRepository
    ) { }


    async handle(): Promise<Order[]> {
        return await this.orderRepository.getAll();
      }

}