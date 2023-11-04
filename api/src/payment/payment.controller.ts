import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { PaymentWebhookDto } from './dto/createPayment.dto';
import { SendPayamentuseCase } from './usecases/sendpayment.usecase';
import { ReponseHttpHelper } from '../presentation/helpers/exception.http.helper';
import { HttpStatusCode } from 'axios';

@Controller('/api/v1/webhook')
export class PaymentController {
  constructor(
    private readonly reponseHttpHelper: ReponseHttpHelper,
    private readonly sendPayamentuseCase: SendPayamentuseCase) {}

  @Post('createPayment')
  async createPaymentWebhook(@Body() data: PaymentWebhookDto) {
    try {
      console.log('Received payment webhook:', data);

      await this.sendPayamentuseCase.handle(data);
      
      return this.reponseHttpHelper.handleReponse(HttpStatusCode.Ok, "create payment success")
    } catch (error) {
      return  this.reponseHttpHelper.handleException(error);
    }
  }

  @Post('receivePayment') // Rota que vai receber a notificação
  receivePaymentNotification(@Body() data: any) {
    try {
      // Processar a notificação
      console.log('Received payment notification:', data);

      if (data.status === 'approved') {
        console.log('Payment was approved.');
        
      } else if (data.status === 'rejected') {
        console.log('Payment was rejected.');
        
      } else {
        console.log('Unknown payment status:', data.status);
        // Tratar outros casos de status de pagamento, se necessário
      }

      return this.reponseHttpHelper.handleReponse(HttpStatusCode.Ok, "create was received")
    } catch (error) {
      return this.reponseHttpHelper.handleException(error);
    }
  }

}






