import { TransactionEntity } from "../entities/transaction.entity";

export type TransactionOutput = {
  valor: number;
  tipo: "c" | "d";
  descricao: string;
  realizada_em: Date;
};

export class TransactionOutputMapper {
  static toOutput(entity: TransactionEntity): TransactionOutput {
    return entity.toJSON();
  }
}
