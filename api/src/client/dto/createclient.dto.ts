import { IsEmail, IsNotEmpty, IsNumber, IsNumberString, Matches, MaxLength, MinLength, Validate } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateClientDTO {
    @IsEmail()
    @ApiProperty()
    email: string;
  
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsNotEmpty()
    @MinLength(11)
    @MaxLength(11)
    @Matches(/\d{11}/g)
    @ApiProperty()
    cpf: string;
  }