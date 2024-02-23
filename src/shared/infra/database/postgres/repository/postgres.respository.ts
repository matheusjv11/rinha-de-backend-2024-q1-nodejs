import { PoolClient } from "pg";

export abstract class PostgresRepository {
  constructor(protected db: PoolClient) {}
}
