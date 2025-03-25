import { Table, Column, Model, DataType, Default, ForeignKey } from "sequelize-typescript";


@Table
export class Tasks extends Model {
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
    })
    id: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    title: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    description: string;

    @Column({
        type: DataType.ENUM( "pending", "in_progress", "completed"),
        allowNull: false,
        defaultValue: "pending",
    })
    status: string;

    @Column({
        type: DataType.UUID,
        allowNull: false,
        references: {
            model: "Users",
            key: "id",
        }
    })
    userId: string;
}
