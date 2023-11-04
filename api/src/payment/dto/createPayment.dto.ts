import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumberString } from "class-validator";

export class PaymentWebhookDto {
    @IsNotEmpty()
    @IsNumberString()
    @ApiProperty()
    amount: string;
  
    @IsNotEmpty()
    @IsNumberString()
    @ApiProperty()
    orderId: string;
  }