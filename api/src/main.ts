import { NestFactory } from '@nestjs/core';
import { OrderModule } from './order/order.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  //Pipes
  app.useGlobalPipes(new ValidationPipe());

  useContainer(app.select(OrderModule), { fallbackOnErrors: true });

  const config = new DocumentBuilder()
    .setTitle('fastfood soat1')
    .setDescription('API de pedidos')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  await app.listen(3000);
}
bootstrap();
