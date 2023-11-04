import { ConflictException, Injectable } from "@nestjs/common";
import { Product } from "../product.entity";
import { ProductRepository } from "../product.repository";
import { CreateProductDTO } from "../dto/createproduct.dto";

@Injectable()
export class CreateProductuseCase {

    constructor(
        private productRepository: ProductRepository,
      ) { }

      async handle(createProductDto: CreateProductDTO): Promise<Product | null> {
        let product = Product.newProductByCreate(createProductDto)
        const storedProduct = await this.productRepository.getByCode(product.code);
        if (storedProduct) {
          throw new ConflictException("Code already exists")
        }
        return await this.productRepository.save(product)
      }
    
}