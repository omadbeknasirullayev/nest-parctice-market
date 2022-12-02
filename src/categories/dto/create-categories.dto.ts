import { IsString } from 'class-validator';

export class CreateCategoriesDto {
  @IsString({ message: "Category_name satr bo'lishi kerak" })
  category_name: string;
}
