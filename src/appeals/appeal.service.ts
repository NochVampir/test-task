import {AppealStatus} from './types';
const {Appeal} = require('../database/models/appeal.model')
import {Op} from 'sequelize';

export class AppealService {

    static async create(title?: string, description?: string){
        try {
            const newAppeal = {
                title,
                description,
                status: AppealStatus.NEW,
                createdAt: new Date(),
                updatedAt: new Date()
            };
            if(title) {
                newAppeal.title = title
            }
            if(description) {
                newAppeal.description = description
            }
            await Appeal.create(newAppeal);

        } catch (e) {
            console.log(e)
            throw new Error(`Appeal not creating. Error: ${e}`)
        }
    }

    static async start(id: string){
        const newAppeal = {
            status: AppealStatus.IN_PROGRESS,
            updatedAt: new Date(),
        }
        try {
            await Appeal.update(newAppeal, {
                where: {
                    id: id,
                }
            })

        } catch (e) {
            console.log(e)
            throw new Error(`Appeal not starting. Error: ${e}`)
        }
    }

    static async complete(id: string, description?: string){
        const newAppeal = {
            description,
            status: AppealStatus.COMPLETED,
            updatedAt: new Date(),
        }
        try {
            await Appeal.update(newAppeal, {
                where: {
                    id: id,
                }
            })

        } catch (e) {
            console.log(e)
            throw new Error(`Appeal not completed. Error: ${e}`)
        }
    }

    static async cancel(id: string, description?: string) {
        const newAppeal = {
            description,
            status: AppealStatus.CANCELLED,
            updatedAt: new Date(),
        }
        try {
            await Appeal.update(newAppeal, {
                where: {
                    id: id,
                }
            })

        } catch (e) {
            console.log(e)
            throw new Error(`Appeal not canceled. Error: ${e}`)
        }
    }

    static async getAppeals(startDate?: Date, endDate?: Date, date?: Date) {
        try {
            const where: any = {};

            if (startDate && !endDate) {
                where.createdAt = {
                    [Op.gte]: startDate
                };
            }else if(!startDate && endDate){
                where.createdAt = {
                    [Op.lte]: endDate
                };
            } else if (startDate && endDate) {
                where.createdAt = {
                    [Op.between]: [startDate, endDate]
                };
            }

            const appeals = await Appeal.findAll({
                where,
                order: [['createdAt', 'DESC']]
            });

            return appeals;
        } catch (e) {
            console.log(e);
            throw new Error(`Error getting appeals: ${e}`);
        }
    }

    static async cancelAllInProgress(){
        try {
            await Appeal.update({
                status: AppealStatus.CANCELLED,
                updatedAt: new Date(),
            }, {
                where: {
                    status: AppealStatus.IN_PROGRESS,
                }
            })
        } catch (e) {
            console.log(e);
            throw new Error(`Error cancel: ${e}`);
        }
    }

} 