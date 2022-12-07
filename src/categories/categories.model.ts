import { BelongsTo, Table, Column, DataType, Model, ForeignKey, HasMany } from "sequelize-typescript"
import { SubCategories } from "src/sub_categories/sub_categories.model"

interface CategoriesCreationAttrs {
    category_name: string
}

@Table({tableName: 'categories'})

export class Categories extends Model <Categories, CategoriesCreationAttrs>  {
    
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    })
    category_id: number

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    category_name: string

    
    @HasMany(() => SubCategories)
    subCategories: SubCategories[]
}