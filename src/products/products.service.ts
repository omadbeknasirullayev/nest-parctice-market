import { Injectable, Options } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { CreateProductsDto, UpdateProductsDto } from './dto';
import { Products } from './products.model';

@Injectable()
export class ProductsService {
    constructor (@InjectModel(Products) private productsrepository: typeof Products) {}

    async create(createProductDto: CreateProductsDto) {
        const product = await this.productsrepository.create(createProductDto)
        return product
    }

    async getAll() {
        const products = await this.productsrepository.findAll()
        return products
    }

    async getBYValues(values: UpdateProductsDto) {
        console.log(values)
        if (values['category_id']) {
            // const products = await 
        }
        const products = await this.productsrepository.findAll({where: {...values}, include: {all: true}})
        // console.log(products)
        return products
    }  
}
