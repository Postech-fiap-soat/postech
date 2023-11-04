import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Order, StatusOrder } from './order.entity';

@Injectable()
export class OrderRepository {
    constructor(
        @InjectRepository(Order)
        private ordersRepository: Repository<Order>,
    ) { }

    async getAll(): Promise<Order[]> {
        return await this.ordersRepository.find();
    }

    async getByStatus(status: string): Promise<Order[]> {

        return await this.ordersRepository.find({ where: { status: +status }, order: { dateTime: "ASC" } });
    }

    async getById(orderId: number) {
        return await this.ordersRepository.findOne(
            {
                where: { id: orderId },
                relations: {
                    cart: {
                        itens: {
                            product: true
                        }
                    }
                }
            }
        )

    }

    async save(order: Order) {
        return await this.ordersRepository.save(order);
    }

    async getAllUnfinished(): Promise<Order[]> {

        return await this.ordersRepository.find({
            where: { status: Not(StatusOrder.FINALIZADO) }
            , order: { dateTime: "ASC" }
            , relations: {
                cart: {
                    itens: {
                        product: true
                    }
                },
                client: true
            }
        });

    }

}
