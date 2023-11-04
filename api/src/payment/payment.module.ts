import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { SendPayamentuseCase } from './usecases/sendpayment.usecase';
import { ReponseHttpHelper } from '../presentation/helpers/exception.http.helper';

@Module({
  controllers: [PaymentController],
  providers: [
    SendPayamentuseCase,
    ReponseHttpHelper
  ],
})
export class PaymentModule {}