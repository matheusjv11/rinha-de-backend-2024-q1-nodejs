import { Pool, PoolClient } from "pg";

const pool = new Pool({
  idleTimeoutMillis: 0,
  max: 10,
  user: "admin",
  password: "123",
  database: "rinha",
  host: "db",
  port: 5432,
});

let client: PoolClient | null = null;

export const connect = async () => {
  client = await pool.connect();
  return client;
};
