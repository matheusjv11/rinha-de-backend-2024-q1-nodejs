import { PoolClient } from "pg";
import { connect } from "../postgres.client";

export abstract class PostgresRepository {
  protected db: Promise<PoolClient>;

  constructor() {
    this.db = connect();
  }
}
