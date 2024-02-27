import { ClientOutput } from "../../../../clients/application/dto/client-output";
import { PostgresRepository } from "../../../../shared/infra/database/postgres/repository/postgres.respository";
import { TransactionEntity } from "../../../entities/transaction.entity";

export class TransactionPgRepository extends PostgresRepository {
  async create(transaction: TransactionEntity) {
    const db_connection = await this.db;

    const { client_id, valor, tipo, descricao } = transaction;

    const {
      rows: [client],
    } = await db_connection.query<ClientOutput>(
      `SELECT saldo, limite FROM clientes WHERE clientes.id = ${client_id}`
    );

    let newBalance = tipo === "c" ? client.saldo + valor : client.saldo - valor;

    if (tipo === "d" && newBalance + client.limite < 0) {
      throw Error("Insuficient balance");
    }

    // Updates client's balance to the new value
    await db_connection.query(
      `UPDATE clientes SET saldo = ${newBalance} WHERE clientes.id = ${client_id}`
    );

    // Inserts the transaction into the history
    await db_connection.query(
      `INSERT INTO transacoes(cliente_id, valor, tipo, descricao) VALUES($1, $2, $3, $4)`,
      [client_id, valor, tipo, descricao]
    );

    return {
      limite: client.limite,
      saldo: newBalance,
    };
  }
}
