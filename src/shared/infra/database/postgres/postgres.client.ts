import { Pool } from "pg";

export async function connect() {
  if (global.connection) {
    return global.connection.connect();
  }

  const pool = new Pool({
    connectionString: "postgres://admin:123@localhost:5432/rinha",
  });

  global.connection = pool;

  return pool.connect();
}
