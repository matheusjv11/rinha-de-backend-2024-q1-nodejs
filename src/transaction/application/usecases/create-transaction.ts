import { FastifyReply } from "fastify";
import { DefaultUseCase } from "../../../shared/application/usecase/default-usecase";
import { TransactionEntity } from "../../entities/transaction.entity";
import { TransactionPgRepository } from "../../infra/database/pg/transaction-pg.repository";

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
    private repository: TransactionPgRepository;

    constructor() {
      this.repository = new TransactionPgRepository();
    }

    async execute(input: Input, res: FastifyReply): Promise<Output> {
      // Input does not match the requirements
      if (!this.isValidBody(input)) {
        return res.code(422).send();
      }

      // Not found user
      if (![1, 2, 3, 4, 5].includes(+input.client_id)) {
        return res.code(404).send();
      }

      const transaction = new TransactionEntity(input);

      try {
        return await this.repository.create(transaction);
      } catch (error) {
        return res.code(422).send();
      }
    }

    private isValidBody(input: Input): boolean {
      if (!input.valor || !input.descricao || !input.tipo || !input.client_id) {
        return false;
      }

      if (input.descricao.length > 10) return false;

      if (!["d", "c"].includes(input.tipo)) return false;

      return true;
    }
  }
}
