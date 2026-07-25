from config.database import conectar
from models.servico import Servico


class ServicoRepository:
    def adicionar(self, servico):
        conexao = conectar()
        cursor = conexao.cursor()

        cursor.execute(
            """
            INSERT INTO servicos (nome, duracao_minutos, preco)
            VALUES (%s, %s, %s)
            """,
            (
                servico.nome,
                servico.duracao_minutos,
                servico.preco,
            ),
        )

        conexao.commit()

        cursor.close()
        conexao.close()

    def listar_todos(self):
        conexao = conectar()
        cursor = conexao.cursor()

        cursor.execute(
            """
            SELECT id, nome, duracao_minutos, preco
            FROM servicos
            """
        )

        linhas = cursor.fetchall()

        cursor.close()
        conexao.close()

        return [Servico(*linha) for linha in linhas]