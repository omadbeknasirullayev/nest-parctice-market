import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SubCategories } from 'src/sub_categories/sub_categories.model';
import { SubCategoriesModule } from 'src/sub_categories/sub_categories.module';
import { ProductsController } from './products.controller';
import { Products } from './products.model';
import { ProductsService } from './products.service';

@Module({
  imports: [
    forwardRef(() => SubCategories),
    SequelizeModule.forFeature([Products, SubCategories])
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService]
})
export class ProductsModule {}
