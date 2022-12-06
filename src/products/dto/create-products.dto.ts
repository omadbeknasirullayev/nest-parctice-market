import { IsNumber, IsString } from "class-validator";

export class CreateProductsDto {
    @IsNumber({}, {message: "sub_category_id butun sun bo'lishi kerak"})
    readonly sub_category_id: number

    @IsString({message: "Model satr bo'lishi kerak"})
    readonly model: string

    @IsString({message: "Product_name satr bo'lishi kerak"})
    readonly product_name: string

    @IsString({message: "Color satr bo'lishi kerak"})
    readonly color: string

    @IsNumber({}, {message: "price raqamlarda bo'llishi kerak"})
    readonly price: number
}