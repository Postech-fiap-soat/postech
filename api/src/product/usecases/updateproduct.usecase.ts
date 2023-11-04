import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "../product.entity";
import { ProductRepository } from "../product.repository";
import { UpdateProductDTO } from "../dto/updateproduct.dto";

@Injectable()
export class UpdateProductuseCase {

    constructor(
        private productRepository: ProductRepository,
      ) { }

      async handle(id: string, updateProductDto: UpdateProductDTO): Promise<Product | null> {
        let product = Product.newProductByUpdate(id, updateProductDto)
        const storedProduct = await this.productRepository.getById(product.id)
        if (!storedProduct) {
          throw new NotFoundException("Product not found")
        }
    
        const otherStoredProduct = await this.productRepository.getByCode(product.code);
        if (otherStoredProduct != null && otherStoredProduct.id != product.id) {
          throw new ConflictException("Code already exist") 
        }
        return await this.productRepository.save(product);
      }
    
}