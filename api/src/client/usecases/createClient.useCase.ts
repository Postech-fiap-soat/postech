import { ConflictException, Injectable } from "@nestjs/common";
import { ClientRepository } from "../client.repository";
import { Client } from "../client.entity";
import { CreateClientDTO } from "../dto/createclient.dto";
import { IsUniqueCpfuseCase } from "./isUniqueCpf.useCase";

@Injectable()
export class CreateClientuseCase {

    constructor(
        private clientRepository: ClientRepository,
        private isUniqueCpfuseCase: IsUniqueCpfuseCase,
      ) { }

      async handle(createClientDto: CreateClientDTO): Promise<Client | null> {

        var client = new Client();
        client.cpf = createClientDto.cpf;
        client.email = createClientDto.email;
        client.name = createClientDto.name;

        if(await this.isUniqueCpfuseCase.handle(client.cpf))
          throw new ConflictException("CPF already exist")
    
         return await this.clientRepository.save(client);
      }
    
}