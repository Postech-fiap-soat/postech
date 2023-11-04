import { CreateClientDTO } from '../src/client/dto/createclient.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module'; // Atualize o caminho para o seu AppModule


describe('ClientController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/api/v1/clients (POST)', async () => {
    const createClientDto: CreateClientDTO = {
      cpf: "04787035118",
      email: "teste@gmail.com",
      name: "teste"
    };

    const response = await request(app.getHttpServer())
      .post('/api/v1/clients')
      .send(createClientDto)
      .expect(201); // Verifique se a resposta é um status 201 (Created)

    expect(response.body).toBeDefined();
    // Adicione outras verificações aqui com base na resposta retornada
  });

  it('/api/v1/clients (GET)', async () => {
    const cpf = '04787035118'; // Substitua pelo CPF válido

    const response = await request(app.getHttpServer())
      .get(`/api/v1/clients?cpf=${cpf}`)
      .expect(200); // Verifique se a resposta é um status 200 (OK)

    expect(response.body).toBeDefined();
    // Adicione outras verificações aqui com base na resposta retornada
  });
});
