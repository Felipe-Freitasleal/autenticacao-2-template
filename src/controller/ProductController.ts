import { Request, Response } from "express"
import { ProductBusiness } from "../business/ProductBusiness"
import { CreateProductInput, GetProductsInput } from "../dtos/ProductDTO"
import { BaseError } from "../errors/BaseError"

export class ProductController {
    constructor(
        private productBusiness: ProductBusiness
    ) {}

    public getProducts = async (req: Request, res: Response) => {
        try {
            const input: GetProductsInput = {
                q: req.query.q,
                token: req.headers.authorization
            }

            const output = await this.productBusiness.getProducts(input)

            res.status(200).send(output)
        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public createProduct = async (req: Request, res: Response) => {
        try {

            const input: CreateProductInput = {
                name: req.body.name,
                price: req.body.price
            }

            const output = await this.productBusiness.createProduct(input)

            res.status(201).send(output)
        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }
}