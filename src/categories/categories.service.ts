import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Categories } from './categories.model';
import { CreateCategoriesDto, UpdateCategoriesDto } from './dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Categories) private categoriesRepository: typeof Categories,
  ) {}

  async create(createCategoriesDto: CreateCategoriesDto) {
    const categories = await this.categoriesRepository.create(
      createCategoriesDto,
    );
    return categories;
  }

  async getAll() {
    const categories = await this.categoriesRepository.findAll({
      include: { all: true },
    });
    return categories;
  }

  async getOneById(id: number) {
    const category = await this.categoriesRepository.findByPk(id, {
      include: { all: true },
    });
    if (!category)
      throw new HttpException(
        'Bunday category topilmadi',
        HttpStatus.NOT_FOUND,
      );
    return category;
  }

  async update(id: number, updatecategoriesdto: UpdateCategoriesDto) {
    console.log(id)
    const category = await this.categoriesRepository.findByPk(id)
    if (!category) 
    throw new HttpException('bunday foydalanuvchi mavjud emas', HttpStatus.NOT_FOUND)
    const updated = this.categoriesRepository.update(updatecategoriesdto, {where: {id}})
    return {message: "Muvaffaqiyatli o'zgartirildi"}
  }

  async deleteById(id: number) {
    const deleted = await this.categoriesRepository.destroy({where: {id}})
    if (!deleted) 
        throw new HttpException('Bunday categoriya topildami', HttpStatus.NOT_FOUND)
    return {message: "Muvaffaqiyatli o'chirildi"}
  }
}
