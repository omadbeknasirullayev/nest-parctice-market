import { IsNumber, IsString } from "class-validator";

export class CreateSubCategoriesDto {
    @IsNumber({}, {message: "category_id butun son bo'lishi kerak"})
    readonly category_id: number
    
    @IsString({message: "Subcategory satr bo'lishi kerak"})
    readonly sub_category_name: string
}