from config.database import conectar
from models.agendamento import Agendamento


class AgendamentoRepository:
    def adicionar(self, agendamento):
        conexao = conectar()
        cursor = conexao.cursor()
        cursor.execute(
            """INSERT INTO agendamentos
               (cliente_id, profissional_id,
               servico_id, data_hora, status)
               VALUES (%s, %s, %s, %s, %s)""",
            (
                agendamento.cliente_id,
                agendamento.profissional_id,
                agendamento.servico_id,
                agendamento.data_hora,
                agendamento.status,
            ),
        )
        conexao.commit()
        cursor.close()
        conexao.close()

    def listar_por_profissional_e_data(
        self, profissional_id, data_hora
    ):
        conexao = conectar()
        cursor = conexao.cursor()
        cursor.execute(
            """SELECT id, cliente_id, profissional_id,
               servico_id, data_hora, status
               FROM agendamentos
               WHERE profissional_id = %s AND
               data_hora = %s AND status != 'cancelado'""",
            (profissional_id, data_hora),
        )
        linhas = cursor.fetchall()
        cursor.close()
        conexao.close()
        return [Agendamento(*linha) for linha in linhas]

    def existe_agendamento_para_cliente(
        self, cliente_id
    ):
        conexao = conectar()
        cursor = conexao.cursor()
        cursor.execute( 
            "SELECT COUNT(*) FROM agendamentos WHERE cliente_id = %s", (cliente_id,) 
        ) 
        total = cursor.fetchone()[0] 
        cursor.close() 
        conexao.close() 
        return total > 0

    def listar_por_profissional_e_periodo(self, profissional_id, inicio, fim):
        conexao = conectar()
        cursor = conexao.cursor()

        cursor.execute(
            """SELECT id, cliente_id, profissional_id,
            servico_id, data_hora, status
            FROM agendamentos
            WHERE profissional_id = %s AND status != 'cancelado'
            AND data_hora < %s AND data_hora >= %s""",
            (profissional_id, fim, inicio),
        )

        linhas = cursor.fetchall()

        cursor.close()
        conexao.close()

        return [Agendamento(*linha) for linha in linhas]