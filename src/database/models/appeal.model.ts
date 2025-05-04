import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../index';
import { AppealStatus } from '../../appeals/types';

export class Appeal extends Model {
    public id!: string;
    public title?: string;
    public description?: string;
    public status!: AppealStatus;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Appeal.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            defaultValue: null,
            allowNull: true,
        },
        description: {
            type: DataTypes.STRING,
            defaultValue: null,
            allowNull: true,
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: AppealStatus.NEW,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'appeals',
        timestamps: true,
    }
); 