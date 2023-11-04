import axios from "axios";
import { PaymentWebhookDto } from "../dto/createPayment.dto";

export class SendPayamentuseCase {

    constructor() {
    }

    async handle(data: PaymentWebhookDto){
        // Simular o envio da notificação para o webhook.site
        const webhookSiteUrl = 'https://webhook.site/ecf8d57c-8357-42fc-8ac4-45392574c85f';
        await axios.post(webhookSiteUrl, data);
    }
}