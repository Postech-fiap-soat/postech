import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { Product } from '../product/product.entity';
import { Client } from '../client/client.entity';
import { OrderRepository } from './order.repository';
import { ClientModule } from '../client/client.module';
import { CheckoutOrderuseCase } from './usecases/checkoutorder.usecase';
import { CreateOrderuseCase } from './usecases/createorder.usecase';
import { GetAllOrdersuseCase } from './usecases/getallorders.usecase';
import { GetOrderByIduseCase } from './usecases/getorderbyid.usecase';
import { GetOrdersByStatususeCase } from './usecases/getordersbystatus.usecase';
import { GetOrdersUnfinisheduseCase } from './usecases/getordersunfinished.usecase';
import { UpdateStatusOrderuseCase } from './usecases/updatestatusorder.usecase';
import { ProductModule } from '../product/product.module';
import { ReponseHttpHelper } from '../presentation/helpers/exception.http.helper';
import { Cart } from '../cart/cart.entity';


@Module({
  imports: [
    ClientModule,
    ProductModule,
    TypeOrmModule.forFeature([Order, Client, Product, Cart])
  ],
  controllers: [OrderController],
  providers: [
    ReponseHttpHelper,
    OrderRepository,
    CheckoutOrderuseCase,
    CreateOrderuseCase,
    GetAllOrdersuseCase,
    GetOrderByIduseCase,
    GetOrdersByStatususeCase,
    GetOrdersUnfinisheduseCase,
    UpdateStatusOrderuseCase
  ]
})
export class OrderModule {
  constructor() { }
}
