import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './client.entity';

@Injectable()
export class ClientRepository {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) { }

  async getByCpf(cpf: string): Promise<Client | null> {
    return await this.clientRepository.findOne({
      where: {
        cpf: cpf,
      }
    });
  }

  async save(client: Client): Promise<Client | null> {
     return await this.clientRepository.save(client);
  }
}
