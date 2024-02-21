import { Entity } from "../../shared/domain/entities/entity";

export interface TransactionProps {
  valor: number;
  tipo: "c" | "d";
  descricao: string;
  realizada_em?: Date;
  client_id: number;
}

export class TransactionEntity extends Entity<TransactionProps> {
  constructor(public readonly props: TransactionProps, id?: string) {
    super(props, id);
    this.props.realizada_em = this.props.realizada_em ?? new Date();
  }

  get valor() {
    return this.props.valor;
  }

  get tipo() {
    return this.props.tipo;
  }

  get descricao() {
    return this.props.descricao;
  }

  get realizada_em() {
    return this.props.realizada_em;
  }

  get client_id() {
    return this.props.client_id;
  }
}
