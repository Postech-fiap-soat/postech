import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateClientDTO } from './dto/createclient.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { GetClientByCpfuseCase } from './usecases/getClientByCpf.useCase';
import { ReponseHttpHelper } from '../presentation/helpers/exception.http.helper';
import { ResponseDTO } from '../presentation/helpers/response.dto';
import { HttpStatusCode } from 'axios';
import { CreateClientuseCase } from './usecases/createClient.useCase';


@Controller("api/v1/clients")
@ApiTags('clients')
export class ClientController {
  constructor(
    private readonly reponseHttpHelper: ReponseHttpHelper,
    private getClientByCpfuseCase: GetClientByCpfuseCase,
    private createClientuseCase: CreateClientuseCase
  ) { }

  @Get()
  @ApiOperation({ summary: 'get client by cpf' })
  async getByCpf(@Query("cpf") cpf: string): Promise<ResponseDTO> {
    try {
      let person = await this.getClientByCpfuseCase.handle(cpf);

      return this.reponseHttpHelper.handleReponse(HttpStatusCode.Ok, '', person)

    } catch (error) {
      return this.reponseHttpHelper.handleException(error);
    }
  }

  @Post()
  @ApiOperation({ summary: 'create client' })
  async create(@Body() client: CreateClientDTO): Promise<ResponseDTO> {
    try {
      let person = await this.createClientuseCase.handle(client);

      return this.reponseHttpHelper.handleReponse(HttpStatusCode.Created, '', person)

    } catch (error) {
      return this.reponseHttpHelper.handleException(error);
    }
  }

}
