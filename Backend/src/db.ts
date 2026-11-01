import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL_POOLED,
    ssl: {
        rejectUnauthorized: false,
    }
});

export default pool;