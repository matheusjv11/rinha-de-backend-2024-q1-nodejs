import { PostgresRepository } from "../../../../shared/infra/database/postgres/repository/postgres.respository";
import { TransactionEntity } from "../../../entities/transaction.entity";

export class TransactionPgRepository extends PostgresRepository {
  async create(transaction: TransactionEntity) {
    const { client_id, valor, tipo, descricao } = transaction;

    const sql =
      "INSERT INTO transacoes(cliente_id, valor, tipo, descricao) VALUES($1, $2, $3, $4) RETURNING id";

    const result = await this.db.query(sql, [
      client_id,
      valor,
      tipo,
      descricao,
    ]);

    return result;
  }
}
