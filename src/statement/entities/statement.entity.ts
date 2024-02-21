import { Entity } from "../../shared/domain/entities/entity";
import { TransactionOutput } from "../../transaction/application/transaction-output";

type StatementProps = {
  total: number;
  limite: number;
  data_extrato?: Date;
  ultimas_transacoes: TransactionOutput[];
};

export class StatementEntity extends Entity<StatementProps> {
  constructor(public readonly props: StatementProps) {
    super(props);
    this.props.data_extrato = this.props.data_extrato ?? new Date();
  }

  get total() {
    return this.props.total;
  }

  get limite() {
    return this.props.limite;
  }

  get data_extrato() {
    return this.props.data_extrato;
  }

  get ultimas_transacoes() {
    return this.props.ultimas_transacoes;
  }
}
