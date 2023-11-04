import { Injectable, NotFoundException } from "@nestjs/common";
import { OrderRepository } from "../order.repository";
import { UpdateStatusOrderDTO } from "../dto/updatestatusorder.dto";
import { Order } from "../order.entity";

@Injectable()
export class UpdateStatusOrderuseCase {

    constructor(
        private orderRepository: OrderRepository,
    ) { }

    
  async handle(orderId: number, updateStatusOrderDTO: UpdateStatusOrderDTO): Promise<Order> {
    var order = await this.orderRepository.getById(orderId);
    
    if(!order){
      throw new NotFoundException()
    }

    order.setStatus(updateStatusOrderDTO.status);

    return this.orderRepository.save(order);

  }

}