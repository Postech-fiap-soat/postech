import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsNumber, Matches, Max, Min } from "class-validator";
import { Cart } from "../../cart/cart.entity";
import { Client } from "../../client/client.entity";

export class CreateOrderDTO {

    @IsNotEmpty()
    @ApiProperty()
    cart: Cart;
  
    @IsNotEmpty()
    @ApiProperty()
    client: Client;
  
    @ApiProperty()
    observation: string;
  
    @ApiProperty()
    totalPrice: number;
}