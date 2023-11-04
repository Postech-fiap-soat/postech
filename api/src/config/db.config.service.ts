import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { Cart } from "../cart/cart.entity";
import { ItemCart } from "../cart/itemcart.entity";
import { Client } from "../client/client.entity";
import { Order } from "../order/order.entity";
import { Product } from "../product/product.entity";

@Injectable()
export class DBConfigService implements TypeOrmOptionsFactory {
    constructor(private configService: ConfigService) { }
    createTypeOrmOptions(): TypeOrmModuleOptions  {
        return {
            type: 'mysql',
            host: this.configService.get<string>('DB_HOST'),
            port: this.configService.get<number>('DB_PORT'),
            username: this.configService.get<string>('DB_USER'),
            password: this.configService.get<string>('DB_PASSWORD'),
            database: this.configService.get<string>('DB_NAME'),
            entities: [Client, Order, Cart, ItemCart, Product],
            synchronize: true
        }
    }
}