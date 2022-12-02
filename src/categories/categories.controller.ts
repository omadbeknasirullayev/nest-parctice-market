import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoriesDto, UpdateCategoriesDto } from './dto';

@Controller('categories')
export class CategoriesController {
    constructor (private readonly categoriesService: CategoriesService) {} 

    @Post()
    create (@Body() createCategoriesDto: CreateCategoriesDto) {
        return this.categoriesService.create(createCategoriesDto)
    }

    @Get()
    getAll() {
        return this.categoriesService.getAll()
    }

    @Get(':id')
    getOneById(@Param('id') id: number) {
        return this.categoriesService.getOneById(id)
    }

    @Put(':id') 
    update(@Param('id') id: number, @Body() updatecategoriesdto: UpdateCategoriesDto) {
        return this.categoriesService.update(id, updatecategoriesdto)
    }

    @Delete(':id')
    deleteById(@Param('id') id: number) {
        return this.categoriesService.deleteById(id)
    }
}
