
import {AppealStatus} from "../../appeals/types";

const {DataTypes} = require('sequelize')
const {db} = require('../index')

const Appeal = db.define('Appeals', {
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
})

Appeal.sync({alter: true})

module.exports.Appeal = Appeal;