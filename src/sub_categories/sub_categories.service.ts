import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateSubCategoriesDto, UpdateSubCategoriesDto } from './dto';
import { SubCategories } from './sub_categories.model';

@Injectable()
export class SubCategoriesService {
  constructor(
    @InjectModel(SubCategories)
    private subCategoriesRepository: typeof SubCategories,
  ) {}

  async create(createSubCategoriesDto: CreateSubCategoriesDto) {
    const newSubCategory = await this.subCategoriesRepository.create(
      createSubCategoriesDto,
    );
    return newSubCategory;
  }

  async getAll() {
    const subCategories = await this.subCategoriesRepository.findAll({
      include: { all: true },
    });
    if (!subCategories)
      throw new HttpException(
        'sub categoriyalar mavjud emas',
        HttpStatus.NOT_FOUND,
      );
    return subCategories;
  }

  async getOneById(id: number) {
    const subCategory = await this.subCategoriesRepository.findByPk(id, {
      include: { all: true },
    });
    if (!subCategory)
      throw new HttpException(
        'sub categoriyalar mavjud emas',
        HttpStatus.NOT_FOUND,
      );
    return subCategory;
  }

  async getByCategory_id(id: number) {
    const data = await this.subCategoriesRepository.findAll({
      where: { category_id: +id },
      include: { all: true },
    });

    let products = []

    products = data.map((val) => {
        return val.dataValues.products.map((item) => {
            return item
        })
    })
    return  products[0]
  }

  async update(id: number, updateSubCategoriesDto: UpdateSubCategoriesDto) {
    const subCategory = await this.subCategoriesRepository.findByPk(id);
    if (!subCategory)
      throw new HttpException(
        'bunday sub-categorya mavjud emas',
        HttpStatus.NOT_FOUND,
      );
    await this.subCategoriesRepository.update(updateSubCategoriesDto, {
      where: { sub_category_id: +id },
    });
    return { message: "Muvaffaqiyatli o'zgartirildi" };
  }

  async deleteSubCategories(id: number) {
    const deleted = await this.subCategoriesRepository.destroy({
      where: { sub_category_id: +id },
    });
    if (!deleted)
      throw new HttpException(
        'bunday sub-categorya mavjud emas',
        HttpStatus.NOT_FOUND,
      );
    return { message: "Muvaffaqiyatli o'chirildi" };
  }
}
