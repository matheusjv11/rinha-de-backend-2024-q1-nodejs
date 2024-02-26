import { Entity } from "../../shared/domain/entities/entity";

type ClientProps = {
  nome: string;
  limite: number;
  saldo: number;
};

export class StatementEntity extends Entity<ClientProps> {
  constructor(public readonly props: ClientProps) {
    super(props);
  }

  get nome() {
    return this.props.nome;
  }

  get limite() {
    return this.props.limite;
  }

  get saldo() {
    return this.props.saldo;
  }
}
