import { connect } from "../../../../shared/infra/database/postgres/postgres.client";
import { GenerateStatement } from "../../../application/usecases/generate-statement";

export class ClientPgRepository {
  async statement(id: number): Promise<GenerateStatement.Output> {
    const db_connection = await connect();

    try {
      const sql = `
        SELECT
            json_build_object(
                'limite', clientes.limite,
                'saldo', clientes.saldo,
                'data_extrato', now() 
            ) AS saldo,
            CASE
                WHEN COUNT(transacoes.id) = 0 THEN jsonb_build_array()
                ELSE jsonb_agg(
                    json_build_object(
                        'valor', transacoes.valor,
                        'tipo', transacoes.tipo,
                        'descricao', transacoes.descricao,
                        'realizada_em', transacoes.realizada_em
                    ) 
                )
            END AS ultimas_transacoes
        FROM 
            clientes
        LEFT JOIN
            transacoes ON clientes.id = transacoes.cliente_id
        WHERE 
            clientes.id = ${id}
        GROUP BY 
            clientes.id, clientes.nome;
        `;

      const result = await db_connection.query<GenerateStatement.Output>(sql);

      return result.rows[0];
    } finally {
      db_connection.release();
    }
  }
}
