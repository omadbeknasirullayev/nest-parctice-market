import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SubCategories } from 'src/sub_categories/sub_categories.model';
import { CategoriesController } from './categories.controller';
import { Categories } from './categories.model';
import { CategoriesService } from './categories.service';

@Module({
  imports: [
    forwardRef(() => SubCategories),
    SequelizeModule.forFeature([Categories, SubCategories]),
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [CategoriesService, CategoriesModule],
})
export class CategoriesModule {}
