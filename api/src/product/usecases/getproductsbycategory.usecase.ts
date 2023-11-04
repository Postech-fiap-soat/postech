import { Injectable } from "@nestjs/common";
import { Product } from "../product.entity";
import { ProductRepository } from "../product.repository";

@Injectable()
export class GetProductsByCategoryuseCase {

    constructor(
        private productRepository: ProductRepository,
      ) { }

      handle(category: string): Promise<Product[]> {
        return this.productRepository.getByCategory(category);
      }
    
}