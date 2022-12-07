import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SubCategoriesService } from 'src/sub_categories/sub_categories.service';
import { CreateProductsDto, UpdateProductsDto } from './dto';
import { Products } from './products.model';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Products) private productsrepository: typeof Products,
    private readonly subCategoriesService: SubCategoriesService,
  ) {}

  async create(createProductDto: CreateProductsDto) {
    const product = await this.productsrepository.create(createProductDto);
    return product;
  }


  async getBYValues(values: UpdateProductsDto) {

    if (Object.entries(values).length == 0) {
      return []
    }

    if (values['category_id']) {
      const products = await this.subCategoriesService.getByCategory_id(
        values['category_id'],
      );
      if (!products) {
        throw new HttpException(
          'Bunday product mavjud emas',
          HttpStatus.NOT_FOUND,
        );
      }
      return products;
    } 
      const products = await this.productsrepository.findAll({
        where: { ...values },
        include: { all: true },
      });

      if (products.length == 0) {
        throw new HttpException(
          'Bunday product mavjud emas',
          HttpStatus.NOT_FOUND,
        );
      }
      return products;
    
  }


  async update(id: number, updateProdutsDto: UpdateProductsDto) {
    const product = await this.productsrepository.findByPk(id);
    if (!product)
      throw new HttpException(
        'bunday sub-categorya mavjud emas',
        HttpStatus.NOT_FOUND,
      );
    await this.productsrepository.update(
      updateProdutsDto,
      { where: { product_id: +id } },
    );
    return { message: 'Muvaffaqiyatli yangilandi' };
  }


  async deleteProducts(id: number) {
    const deleted = await this.productsrepository.destroy({
      where: { product_id: +id },
    });
    if (!deleted)
      throw new HttpException(
        'Bunday product mavjud emas',
        HttpStatus.NOT_FOUND,
      );
    return { message: "Muvaffaqiyatli o'chirildi" };
  }

}
