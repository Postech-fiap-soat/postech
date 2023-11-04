import { HttpStatus, INestApplication } from "@nestjs/common"
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import { CreateProductDTO } from "src/product/dto/createproduct.dto"
import * as request from "supertest"

describe("Product", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
    describe("creating a new valid product", () => {
      let productId: number
      it("create product successfully", () => {
        const mockProduct: CreateProductDTO = {
          category: 'LANCHE',
          code: 'CODE1',
          description: 'X-burger',
          price: 10
        }     
        return request(app.getHttpServer())
          .post('/api/v1/products')
          .set("Accept", "application/json")
          .send(mockProduct)
          .expect((response: request.Response) => {
            const {
                status,
                data,
                message
            } = response.body
            productId = data.id
            expect(status).toEqual(HttpStatus.CREATED),
            expect(message).toEqual('product was created successfully'),
            expect(data.code).toEqual('CODE1'),
            expect(data.description).toEqual('X-burger'),
            expect(data.price).toEqual(10),
            expect(data.category).toEqual('LANCHE')
          })
          .expect(HttpStatus.CREATED)
      })
      it("get one product in list", () => {    
        return request(app.getHttpServer())
          .get('/api/v1/products')
          .set("Accept", "application/json")
          .expect((response: request.Response) => {
            const {
                status,
                data,
                message
            } = response.body
            expect(status).toEqual(HttpStatus.OK),
            expect(message).toEqual(''),
            expect(data.length).toEqual(1),
            expect(data[0].code).toEqual('CODE1'),
            expect(data[0].description).toEqual('X-burger'),
            expect(data[0].price).toEqual(10),
            expect(data[0].category).toEqual('LANCHE')
          })
          .expect(HttpStatus.OK)
      })
      it("Removing", () => {  
        return request(app.getHttpServer())
          .delete(`/api/v1/products/${productId}`)
          .set("Accept", "application/json")
          .expect((response: request.Response) => {
            const {
                status,
                data,
                message
            } = response.body
            expect(status).toEqual(200),
            expect(message).toEqual('product was deleted successfully')
            expect(data).toEqual(null)
          })
          .expect(HttpStatus.OK)
      })
    })
    describe("creating a product already exists", () => {
      let productId: number
      it("create product successfully", () => {
        const mockProduct: CreateProductDTO = {
          category: 'LANCHE',
          code: 'CODE1',
          description: 'X-burger',
          price: 10
        }     
        return request(app.getHttpServer())
          .post('/api/v1/products')
          .set("Accept", "application/json")
          .send(mockProduct)
          .expect((response: request.Response) => {
            const {
                status,
                data,
                message
            } = response.body
            productId = data.id
            expect(status).toEqual(HttpStatus.CREATED),
            expect(message).toEqual('product was created successfully'),
            expect(data.code).toEqual('CODE1'),
            expect(data.description).toEqual('X-burger'),
            expect(data.price).toEqual(10),
            expect(data.category).toEqual('LANCHE')
          })
          .expect(HttpStatus.CREATED)
      })
      it("get one product in list", () => {    
        return request(app.getHttpServer())
          .get('/api/v1/products')
          .set("Accept", "application/json")
          .expect((response: request.Response) => {
            const {
                status,
                data,
                message
            } = response.body
            expect(status).toEqual(HttpStatus.OK),
            expect(message).toEqual(''),
            expect(data.length).toEqual(1),
            expect(data[0].code).toEqual('CODE1'),
            expect(data[0].description).toEqual('X-burger'),
            expect(data[0].price).toEqual(10),
            expect(data[0].category).toEqual('LANCHE')
          })
          .expect(HttpStatus.OK)
      })
      it("product was not created", () => {
        const mockProduct: CreateProductDTO = {
          category: 'LANCHE',
          code: 'CODE1',
          description: 'X-burger',
          price: 10
        }     
        return request(app.getHttpServer())
          .post('/api/v1/products')
          .set("Accept", "application/json")
          .send(mockProduct)
          .expect((response: request.Response) => {
            const {
                status,
                data,
                message
            } = response.body
            expect(status).toEqual(HttpStatus.CONFLICT),
            expect(message).toEqual('Code already exists'),
            expect(data).toEqual(null)
          })
          .expect(HttpStatus.CREATED)
      })
      it("get one product in list", () => {    
        return request(app.getHttpServer())
          .get('/api/v1/products')
          .set("Accept", "application/json")
          .expect((response: request.Response) => {
            const {
                status,
                data,
                message
            } = response.body
            expect(status).toEqual(HttpStatus.OK),
            expect(message).toEqual(''),
            expect(data.length).toEqual(1),
            expect(data[0].code).toEqual('CODE1'),
            expect(data[0].description).toEqual('X-burger'),
            expect(data[0].price).toEqual(10),
            expect(data[0].category).toEqual('LANCHE')
          })
          .expect(HttpStatus.OK)
      })
      it("Removing", () => {  
        return request(app.getHttpServer())
          .delete(`/api/v1/products/${productId}`)
          .set("Accept", "application/json")
          .expect((response: request.Response) => {
            const {
                status,
                data,
                message
            } = response.body
            expect(status).toEqual(200),
            expect(message).toEqual('product was deleted successfully')
            expect(data).toEqual(null)
          })
          .expect(HttpStatus.OK)
      })
    })
    describe("updating a valid product", () => {
      let productId: number
      it("create product successfully", () => {
        const mockProduct: CreateProductDTO = {
          category: 'LANCHE',
          code: 'CODE1',
          description: 'X-burger',
          price: 10
        }     
        return request(app.getHttpServer())
          .post('/api/v1/products')
          .set("Accept", "application/json")
          .send(mockProduct)
          .expect((response: request.Response) => {
            const {
                status,
                data,
                message
            } = response.body
            productId = data.id
            expect(status).toEqual(HttpStatus.CREATED),
            expect(message).toEqual('product was created successfully'),
            expect(data.code).toEqual('CODE1'),
            expect(data.description).toEqual('X-burger'),
            expect(data.price).toEqual(10),
            expect(data.category).toEqual('LANCHE')
          })
          .expect(HttpStatus.CREATED)
      })
      it("get one product in list", () => {    
        return request(app.getHttpServer())
          .get('/api/v1/products')
          .set("Accept", "application/json")
          .expect((response: request.Response) => {
            const {
                status,
                data,
                message
            } = response.body
            expect(status).toEqual(HttpStatus.OK),
            expect(message).toEqual(''),
            expect(data.length).toEqual(1),
            expect(data[0].code).toEqual('CODE1'),
            expect(data[0].description).toEqual('X-burger'),
            expect(data[0].price).toEqual(10),
            expect(data[0].category).toEqual('LANCHE')
          })
          .expect(HttpStatus.OK)
      })
      it("update product successfully", () => {
        const mockProduct: CreateProductDTO = {
          category: 'LANCHE',
          code: 'CODE1',
          description: 'X-salada',
          price: 15
        }     
        return request(app.getHttpServer())
          .put(`/api/v1/products/${productId}`)
          .set("Accept", "application/json")
          .send(mockProduct)
          .expect((response: request.Response) => {
            const {
                status,
                data,
                message
            } = response.body
            expect(status).toEqual(HttpStatus.OK),
            expect(message).toEqual('product was updated successfully'),
            expect(data.code).toEqual('CODE1'),
            expect(data.description).toEqual('X-salada'),
            expect(data.price).toEqual(15),
            expect(data.category).toEqual('LANCHE')
          })
          .expect(HttpStatus.OK)
      })
      it("get one product with updated data in list", () => {    
        return request(app.getHttpServer())
          .get('/api/v1/products')
          .set("Accept", "application/json")
          .expect((response: request.Response) => {
            const {
                status,
                data,
                message
            } = response.body
            expect(status).toEqual(HttpStatus.OK),
            expect(message).toEqual(''),
            expect(data.length).toEqual(1),
            expect(data[0].code).toEqual('CODE1'),
            expect(data[0].description).toEqual('X-salada'),
            expect(data[0].price).toEqual(15),
            expect(data[0].category).toEqual('LANCHE')
          })
          .expect(HttpStatus.OK)
      })
      it("Removing", () => {  
        return request(app.getHttpServer())
          .delete(`/api/v1/products/${productId}`)
          .set("Accept", "application/json")
          .expect((response: request.Response) => {
            const {
                status,
                data,
                message
            } = response.body
            expect(status).toEqual(200),
            expect(message).toEqual('product was deleted successfully')
            expect(data).toEqual(null)
          })
          .expect(HttpStatus.OK)
      })
    })
    describe("updating a product does not exist", () => {
      it("get empty list", () => {    
        return request(app.getHttpServer())
          .get('/api/v1/products')
          .set("Accept", "application/json")
          .expect((response: request.Response) => {
            const {
                status,
                data,
                message
            } = response.body
            expect(status).toEqual(HttpStatus.OK),
            expect(message).toEqual(''),
            expect(data.length).toEqual(0)
          })
          .expect(HttpStatus.OK)
      })
      it("return error of product not found", () => {
        const mockProduct: CreateProductDTO = {
          category: 'LANCHE',
          code: 'CODE1',
          description: 'X-salada',
          price: 15
        }     
        return request(app.getHttpServer())
          .put(`/api/v1/products/1`)
          .set("Accept", "application/json")
          .send(mockProduct)
          .expect((response: request.Response) => {
            const {
                status,
                data,
                message
            } = response.body
            expect(status).toEqual(HttpStatus.NOT_FOUND),
            expect(message).toEqual('Product not found'),
            expect(data).toEqual(null)
          })
          .expect(HttpStatus.OK)
      })
    })
    describe("deleting a product", () => {
      let productId: number
      it("create product successfully", () => {
        const mockProduct: CreateProductDTO = {
          category: 'LANCHE',
          code: 'CODE1',
          description: 'X-burger',
          price: 10
        }     
        return request(app.getHttpServer())
          .post('/api/v1/products')
          .set("Accept", "application/json")
          .send(mockProduct)
          .expect((response: request.Response) => {
            const {
                status,
                data,
                message
            } = response.body
            productId = data.id
            expect(status).toEqual(HttpStatus.CREATED),
            expect(message).toEqual('product was created successfully'),
            expect(data.code).toEqual('CODE1'),
            expect(data.description).toEqual('X-burger'),
            expect(data.price).toEqual(10),
            expect(data.category).toEqual('LANCHE')
          })
          .expect(HttpStatus.CREATED)
      })
      it("get one product in list", () => {    
        return request(app.getHttpServer())
          .get('/api/v1/products')
          .set("Accept", "application/json")
          .expect((response: request.Response) => {
            const {
                status,
                data,
                message
            } = response.body
            expect(status).toEqual(HttpStatus.OK),
            expect(message).toEqual(''),
            expect(data.length).toEqual(1),
            expect(data[0].code).toEqual('CODE1'),
            expect(data[0].description).toEqual('X-burger'),
            expect(data[0].price).toEqual(10),
            expect(data[0].category).toEqual('LANCHE')
          })
          .expect(HttpStatus.OK)
      })
      it("delete produc successfully", () => {  
        return request(app.getHttpServer())
          .delete(`/api/v1/products/${productId}`)
          .set("Accept", "application/json")
          .expect((response: request.Response) => {
            const {
                status,
                data,
                message
            } = response.body
            expect(status).toEqual(200),
            expect(message).toEqual('product was deleted successfully')
            expect(data).toEqual(null)
          })
          .expect(HttpStatus.OK)
      })
      it("get empty list", () => {    
        return request(app.getHttpServer())
          .get('/api/v1/products')
          .set("Accept", "application/json")
          .expect((response: request.Response) => {
            const {
                status,
                data,
                message
            } = response.body
            expect(status).toEqual(HttpStatus.OK),
            expect(message).toEqual(''),
            expect(data.length).toEqual(0)
          })
          .expect(HttpStatus.OK)
      })
    })
  })