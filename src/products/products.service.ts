import { HttpException, HttpStatus, Injectable, Options } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { identity } from 'rxjs';
import { Op } from 'sequelize';
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

  async getAll() {
    return []
  }

  async getBYValues(values: UpdateProductsDto) {
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
    } else {
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
  }
}
