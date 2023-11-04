import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./product.entity";
import { Not, Repository } from "typeorm";
import { CreateProductDTO } from "./dto/createproduct.dto";
import { UpdateProductDTO } from "./dto/updateproduct.dto";

@Injectable()
export class ProductRepository {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
    ) { }

    async getAll(): Promise<Product[]> {
        return await this.productRepository.find();
    }

    async getByCategory(category: string): Promise<Product[]> {
        return this.productRepository.findBy({ category: category });
    }

    async getByCode(code: string): Promise<Product | null> {
        return await this.productRepository.findOneBy({ code: code })
    }

    async save(product: Product): Promise<Product | null> {
        return await this.productRepository.save(product)
    }

    async getById(id: number): Promise<Product | null> {
        return await this.productRepository.findOneBy({
            id: id
        })
    }

    async remove(product: Product): Promise<Product> {
        return await this.productRepository.remove(product)
    }
}
