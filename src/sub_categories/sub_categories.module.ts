import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Categories } from 'src/categories/categories.model';
import { CategoriesModule } from 'src/categories/categories.module';
import { SubCategoriesController } from './sub_categories.controller';
import { SubCategories } from './sub_categories.model';
import { SubCategoriesService } from './sub_categories.service';

@Module({
  imports: [
    forwardRef(() => CategoriesModule),

    SequelizeModule.forFeature([Categories, SubCategories ],
      ), 
      CategoriesModule
  ],
  controllers: [SubCategoriesController],
  providers: [SubCategoriesService],
  exports: [SubCategoriesService]
})
export class SubCategoriesModule {}
