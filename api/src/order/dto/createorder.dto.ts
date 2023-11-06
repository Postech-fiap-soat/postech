import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsNumber, Matches, Max, Min } from "class-validator";
import { Cart } from "../../cart/cart.entity";

export class CreateOrderDTO {

    @IsNotEmpty()
    @ApiProperty()
    cart: Cart;
  
    @ApiProperty()
    observation: string;
  
    @ApiProperty()
    totalPrice: number;
}