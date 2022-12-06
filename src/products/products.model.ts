import { extname } from "path"
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript"
import { Col } from "sequelize/types/utils"
import { SubCategories } from "src/sub_categories/sub_categories.model"

interface CreateProductsAttr {
    sub_category_id: number
    model: string
    product_name: string
    color: string
    price: number
}

@Table({tableName: 'products'})
export class Products extends Model<Products, CreateProductsAttr> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    })
    product_id: number

    @ForeignKey(() => SubCategories)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    sub_category_id: number

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    model: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    product_name: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    color: string

    @Column({
        type: DataType.FLOAT,
        allowNull: false
    })
    price: number

    @BelongsTo(() => SubCategories)
    subcategories: SubCategories
}