import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateSubCategoriesDto, UpdateSubCategoriesDto } from './dto';
import { SubCategories } from './sub_categories.model';

@Injectable()
export class SubCategoriesService {
    constructor (@InjectModel(SubCategories) private subCategoriesRepository: typeof SubCategories) {}

    async create(createSubCategoriesDto: CreateSubCategoriesDto) {
        const newSubCategory = await this.subCategoriesRepository.create(createSubCategoriesDto)
        return newSubCategory
    }

    async getAll() {
        const subCategories = await this.subCategoriesRepository.findAll({include: {all: true}})
        if (!subCategories) 
            throw new HttpException('sub categoriyalar mavjud emas', HttpStatus.NOT_FOUND)
        return subCategories
    }

    async getOneById(id: number) {
        const subCategory = await this.subCategoriesRepository.findByPk(id, {include: {all: true}})
        if (!subCategory)
            throw new HttpException('sub categoriyalar mavjud emas', HttpStatus.NOT_FOUND)
        return subCategory
    }

    async update(id: number, updateSubCategoriesDto: UpdateSubCategoriesDto) {
        const subCategory = await this.subCategoriesRepository.findByPk(id)
        if (!subCategory) 
            throw new HttpException("bunday sub-categorya mavjud emas", HttpStatus.NOT_FOUND)
        await this.subCategoriesRepository.update(updateSubCategoriesDto, {where: {id}})
        return {message: "Muvaffaqiyatli o'zgartirildi"}
    }

    async deleteSubCategories(id: number) {
        const deleted = await this.subCategoriesRepository.destroy({where: {id}})
        if (!deleted) 
            throw new HttpException("bunday sub-categorya mavjud emas", HttpStatus.NOT_FOUND)
        return {message: "Muvaffaqiyatli o'chirildi"}
    }
}
