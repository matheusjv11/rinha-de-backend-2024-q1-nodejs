import { exit } from "process";
import { BadRequestError } from "../../../shared/application/erros/bad-request-error";
import { DefaultUseCase } from "../../../shared/application/usecase/default-usecase";
import { connect } from "../../../shared/infra/database/postgres/postgres.client";
import { TransactionEntity } from "../../entities/transaction.entity";
import { TransactionPgRepository } from "../../infra/database/pg/transaction-pg.repository";
import { Pool } from "pg";

export namespace CreateTransaction {
  export type Input = {
    valor: number;
    tipo: "c" | "d";
    descricao: string;
    client_id: number;
  };

  export type Output = {
    limite: number;
    saldo: number;
  };

  export class UseCase implements DefaultUseCase<Input, Output> {
    async execute(input: Input): Promise<Output> {
      if (!input.valor || !input.descricao || !input.tipo || input.client_id) {
        /* throw new BadRequestError("Invalid form body"); */
      }

      const transaction = new TransactionEntity(input);

      // TODO: Initialize database globally instead of inside the code
      const pool = new Pool({
        connectionString: "postgres://admin:123@localhost:5432/rinha",
      });

      const pgClient = await pool.connect();

      const result = await new TransactionPgRepository(pgClient).create(
        transaction
      );

      return {
        limite: 0,
        saldo: 0,
      };
    }
  }
}
