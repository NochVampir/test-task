import { Dialect, Sequelize } from 'sequelize';
import { dbConfig } from './config';

export const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    {
        host: dbConfig.host,
        port: dbConfig.port,
        dialect: dbConfig.dialect,
        pool: dbConfig.pool,
        logging: console.log,
    }
);

export const initDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection');
        
        await sequelize.sync();
        console.log('Synchronized');
    } catch (error) {
        console.error('Connection error:', error);
        throw error;
    }
}; 