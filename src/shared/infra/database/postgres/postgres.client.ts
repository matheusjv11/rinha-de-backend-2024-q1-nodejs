import { Pool, PoolClient } from "pg";

const pool = new Pool({
  connectionString: "postgres://admin:123@db:5432/rinha",
});

let client: PoolClient | null = null;

export const connect = async () => {
  client = await pool.connect();

  return client;
};
