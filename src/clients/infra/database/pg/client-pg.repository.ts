import { PostgresRepository } from "../../../../shared/infra/database/postgres/repository/postgres.respository";
import { GenerateStatement } from "../../../application/usecases/generate-statement";

export class ClientPgRepository extends PostgresRepository {
  async statement(id: number): Promise<GenerateStatement.Output> {
    const sql = `
    SELECT
        json_build_object(
            'limite', clientes.limite,
        'saldo', clientes.saldo,
        'data_extrato', now() 
        )  as saldo,
        jsonb_agg(
            json_build_object(
                'valor', transacoes.valor,
                'tipo', transacoes.tipo,
                'descricao', transacoes.descricao,
                'realizada_em', transacoes.realizada_em
            ) 
        ) as ultimas_transacoes
    FROM 
        clientes
    JOIN
        transacoes ON clientes.id = transacoes.cliente_id
    WHERE 
        clientes.id = ${id}
    GROUP BY 
        clientes.id, clientes.nome;
    `;

    const result = await (await this.db).query<GenerateStatement.Output>(sql);

    return result.rows[0];
  }
}
