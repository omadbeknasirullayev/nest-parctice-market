import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op, where } from 'sequelize';
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

    async getBYValues(values: CreateProductsDto) {
        const products = await this.productsrepository.findAll()
        return products
    }
}
