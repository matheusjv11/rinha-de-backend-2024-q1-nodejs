import { Pool, PoolClient } from "pg";

const pool = new Pool({
  connectionString: "postgres://admin:123@localhost:5432/rinha",
});

let client: PoolClient | null = null;

export const connect = async () => {
  if (client) {
    return client;
  }

  client = await pool.connect();

  return client;
};
