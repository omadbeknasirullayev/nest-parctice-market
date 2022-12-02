import { Model, Table, Column, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Categories } from "src/categories/categories.model";

interface subCategoriesCreateAttr {
    sub_category_name: string
}

@Table({tableName: 'sub_categories'})

export class SubCategories extends Model <SubCategories, subCategoriesCreateAttr> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    })
    sub_category_id: number

    @ForeignKey(() => Categories)
    @Column({
        type: DataType.INTEGER,
    })
    category_id: number

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    sub_category_name: string

    @BelongsTo(() => Categories) 
    categories: Categories
}