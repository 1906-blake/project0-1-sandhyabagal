import { Pool } from 'pg';

const connectionConfiguration = {
    user: process.env.CARD_DB_USERNAME || 'postgres',
    host: process.env.CARD_DB_URL || 'localhost',
    database: process.env.CARD_DB_NAME || 'ers_api', 
    password: process.env.CARD_DB_PASSWORD || 'sandhyab0925',
    port: +process.env.CARD_DB_PORT || 5432,
    max: 5
}
console.log(connectionConfiguration);
export const connectionPool = new Pool(connectionConfiguration)