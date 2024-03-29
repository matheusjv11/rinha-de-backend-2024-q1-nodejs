import { ClientOutput } from "../../../../clients/application/dto/client-output";
import { connect } from "../../../../shared/infra/database/postgres/postgres.client";
import { CreateTransaction } from "../../../application/usecases/create-transaction";
import { TransactionEntity } from "../../../entities/transaction.entity";

export class TransactionPgRepository {
  async create(
    transaction: TransactionEntity
  ): Promise<CreateTransaction.Output> {
    const db_connection = await connect();
    const { client_id, valor, tipo, descricao } = transaction;

    try {
      await db_connection.query("BEGIN");

      const {
        rows: [client],
      } = await db_connection.query<ClientOutput>(
        `SELECT saldo, limite FROM clientes WHERE clientes.id = ${client_id} FOR UPDATE`
      );

      let newBalance =
        tipo === "c" ? client.saldo + valor : client.saldo - valor;

      console.log(client, " - ", transaction, " - ", newBalance);
      if (tipo === "d" && newBalance + client.limite < 0) {
        throw Error("Insuficient balance");
      }

      // Updates client's balance to the new value
      await db_connection.query(
        `UPDATE clientes SET saldo = ${newBalance} WHERE clientes.id = ${client_id}`
      );

      await db_connection.query("COMMIT");

      // Inserts the transaction into the history
      await db_connection.query(
        `INSERT INTO transacoes(cliente_id, valor, tipo, descricao) VALUES($1, $2, $3, $4)`,
        [client_id, valor, tipo, descricao]
      );

      return {
        limite: client.limite,
        saldo: newBalance,
      };
    } catch (error) {
      await db_connection.query("ROLLBACK");
      throw new Error();
    } finally {
      db_connection.release();
    }
  }
}
