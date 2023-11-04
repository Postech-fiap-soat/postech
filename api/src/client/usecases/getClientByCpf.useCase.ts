import { Injectable, NotFoundException } from "@nestjs/common";
import { ClientRepository } from "../client.repository";
import { Client } from "../client.entity";

@Injectable()
export class GetClientByCpfuseCase {

  constructor(
    private clientRepository: ClientRepository
  ) { }

  async handle(cpf: string): Promise<Client | null> {
    let person = await this.clientRepository.getByCpf(cpf);

    if (!person)
      throw new NotFoundException("Client not found");

    return person;
  }

}