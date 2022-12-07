import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
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
        return this.productService.getBYValues(values)
    }

    @Put(':id')
    update(@Param('id') id: number, updatecategoriesdto: UpdateCategoriesDto) {
        return this.productService.update(id, updatecategoriesdto)
    }

    @Delete(':id')
    deleteProducts(@Param('id') id: number) {
        return this.productService.deleteProducts(id)
    }
}
