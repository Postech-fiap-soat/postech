import { Injectable } from "@nestjs/common";
import { Product } from "../product.entity";
import { ProductRepository } from "../product.repository";

@Injectable()
export class GetProductsByCodeuseCase {

    constructor(
        private productRepository: ProductRepository,
      ) { }

      async handle(code: string): Promise<Product | null> {
        return await this.productRepository.getByCode(code);
      }
    
}