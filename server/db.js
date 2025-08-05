const { Pool } = require('pg');
require('dotenv').config();

const connectionString = process.env.DATABASE_URL;

console.log('Attempting to connect to the database...');
if (connectionString) {
  console.log('Using DATABASE_URL environment variable.');
} else {
  console.log('Using local .env file configuration.');
}

const dbConfig = connectionString
  ? {
      connectionString: connectionString,
      ssl: {
        rejectUnauthorized: false,
      },
    }
  : {
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_DATABASE,
    };

const pool = new Pool(dbConfig);

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Database connected successfully at:', res.rows[0].now);
  }
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
