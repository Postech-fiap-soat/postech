import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./product.entity";
import { ProductController } from "./product.controller";
import { ProductRepository } from "./product.repository";
import { CreateProductuseCase } from "./usecases/createproduct.usecase";
import { DeleteProductuseCase } from "./usecases/deleteproduct.usecase";
import { GetAllProductsuseCase } from "./usecases/getallproducts.usecase";
import { GetProductsByCategoryuseCase } from "./usecases/getproductsbycategory.usecase";
import { UpdateProductuseCase } from "./usecases/updateproduct.usecase";
import { GetProductsByCodeuseCase } from "./usecases/getproductsbycode.usecase";
import { ReponseHttpHelper } from "../presentation/helpers/exception.http.helper";

@Module({
    imports: [        
        TypeOrmModule.forFeature([Product])
    ],
    controllers: [ProductController],
    providers: [ 
        ProductRepository,
        CreateProductuseCase,
        DeleteProductuseCase,
        GetAllProductsuseCase,
        GetProductsByCategoryuseCase,
        UpdateProductuseCase,
        GetProductsByCodeuseCase,
        ReponseHttpHelper
    ],
    exports: [
        GetProductsByCodeuseCase
    ]
})
export class ProductModule {
constructor() { }
}
