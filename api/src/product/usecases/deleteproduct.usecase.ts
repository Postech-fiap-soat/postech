import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "../product.entity";
import { ProductRepository } from "../product.repository";

@Injectable()
export class DeleteProductuseCase {

    constructor(
        private productRepository: ProductRepository,
      ) { }

      async handle(id: number): Promise<Product> {
        const storedProduct = await this.productRepository.getById(id)
        if (storedProduct == null) {
          throw new NotFoundException("product not found")
        } 
        return await this.productRepository.remove(storedProduct)
      }
    
}