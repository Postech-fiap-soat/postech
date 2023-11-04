import { Injectable, NotFoundException } from "@nestjs/common";
import { OrderRepository } from "../order.repository";
import { StatusOrder } from "../order.entity";

@Injectable()
export class CheckoutOrderuseCase {

    constructor(
        private orderRepository: OrderRepository,
    ) { }


    async handle(orderId: number){
        var storedOrder = await this.orderRepository.getById(orderId)
        
        if (!storedOrder) 
          throw new NotFoundException("Order not found");
        
        storedOrder.setStatus(StatusOrder.FINALIZADO);

        await this.orderRepository.save(storedOrder);
    
        return {
            valorTotal : storedOrder.getTotalPrice(),
            pagamento : 'Pix',
            resume : storedOrder
          };
      }

}