import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateSubCategoriesDto, UpdateSubCategoriesDto } from './dto';
import { SubCategoriesService } from './sub_categories.service';

@Controller('sub-categories')
export class SubCategoriesController {
    constructor (private readonly subCategoriesService: SubCategoriesService) {}

    @Post()
    create(@Body() createSubCategoriesDto: CreateSubCategoriesDto) {
        return this.subCategoriesService.create(createSubCategoriesDto)
    }

    @Get() 
    getAll() {
        return this.subCategoriesService.getAll()
    }

    @Get(':id')
    getOneById(@Param('id') id: number) {
        return this.subCategoriesService.getOneById(id)
    }

    @Put(':id')
    update(@Param('id') id: number, updateSubCategoriesDto: UpdateSubCategoriesDto) {
        return this.subCategoriesService.update(id, updateSubCategoriesDto)
    }

    @Delete(':id')
    deleteSubCategories(@Param('id') id: number) {
        return this.subCategoriesService.deleteSubCategories(id)
    }
}
