import { ConflictException, HttpException, Inject, Injectable, NotFoundException } from "@nestjs/common"
import { ResponseDTO } from "./response.dto"
import { HttpStatusCode } from "axios";

@Injectable()
export class ReponseHttpHelper {

  handleReponse(statusCode: number, message: string, data: any = {}): ResponseDTO {
    return new ResponseDTO(statusCode, message, data);
  }


  handleException(error: Error): ResponseDTO {

    if (error instanceof NotFoundException)
      return new ResponseDTO(HttpStatusCode.NotFound, error.message, null)

    if (error instanceof ConflictException)
      return new ResponseDTO(HttpStatusCode.Conflict, error.message, null)

    return new ResponseDTO(HttpStatusCode.InternalServerError, error.message, null)
  }
}