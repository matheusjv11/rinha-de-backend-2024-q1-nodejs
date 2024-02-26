import { Pool } from "pg";
import { DefaultUseCase } from "../../../shared/application/usecase/default-usecase";
import { TransactionOutput } from "../../../transaction/application/dto/transaction-output";
import { ClientPgRepository } from "../../infra/database/pg/client-pg.repository";

export namespace GenerateStatement {
  export type Input = {
    id: number;
  };

  export type Output = {
    saldo: {
      total: number;
      data_extrato: Date;
      limite: number;
    };
    ultimas_transacoes: TransactionOutput[];
  };

  export class UseCase implements DefaultUseCase<Input, Output> {
    private repository: ClientPgRepository;

    constructor() {
      this.repository = new ClientPgRepository();
    }

    async execute(input: Input): Promise<Output> {
      return await this.repository.statement(input.id);
    }
  }
}
