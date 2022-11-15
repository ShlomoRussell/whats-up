import mysql from "mysql2";
import { promisify } from "util";
import { config } from "dotenv";
config();

const { createPool, QueryFunction } = mysql;

const pool = createPool({
  connectionLimit: 100, //important
  host: "localhost",
  user: "root",
  password: process.env.DATABASE_PASSWORD,
  database: "whats_up",
  debug: false,
});

/**
 * @type {Promise<QueryFunction>}
 */
const queryAsync = promisify(pool.query).bind(pool);

/**
 * @param {string} query
 * @param {string[]} params
 */
export async function runQuery(query, params) {
  return queryAsync(query, params);
}



 

