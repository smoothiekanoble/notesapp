const { Pool } = require('pg');
require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production';

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString: isProduction ? connectionString : undefined,
  user: isProduction ? undefined : process.env.DB_USER,
  password: isProduction ? undefined : process.env.DB_PASSWORD,
  host: isProduction ? undefined : process.env.DB_HOST,
  port: isProduction ? undefined : process.env.DB_PORT,
  database: isProduction ? undefined : process.env.DB_DATABASE,
  ssl: isProduction ? { rejectUnauthorized: false } : false,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
