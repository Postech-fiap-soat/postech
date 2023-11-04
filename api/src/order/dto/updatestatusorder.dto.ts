import { ApiProperty } from "@nestjs/swagger";
import { StatusOrder } from "../order.entity";
import { IsEnum, IsNotEmpty} from "class-validator";

export class UpdateStatusOrderDTO {

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(StatusOrder)
    status: StatusOrder;
}