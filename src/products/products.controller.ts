import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UpdateCategoriesDto } from 'src/categories/dto';
import { CreateProductsDto } from './dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor (private readonly productService: ProductsService) {}

    @Post() 
    create(@Body() createProductDto: CreateProductsDto) {
        return this.productService.create(createProductDto)
    }

    @Get()
    getByValues(@Query() values: UpdateCategoriesDto) {
        // console.log(values)
        return this.productService.getBYValues(values)
    }
}
