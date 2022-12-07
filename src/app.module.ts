import { Module } from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize'
import {ConfigModule} from '@nestjs/config'

import { CategoriesModule } from './categories/categories.module';
import { SubCategoriesModule } from './sub_categories/sub_categories.module';
import { Categories } from './categories/categories.model';
import { SubCategories } from './sub_categories/sub_categories.model';
import { ProductsModule } from './products/products.module';
import { Products } from './products/products.model';

@Module({
  imports: [
    
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [Categories, SubCategories, Products],
      autoLoadModels: true,
      logging: false
    }),
    
    CategoriesModule,
    SubCategoriesModule,
    ProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
 