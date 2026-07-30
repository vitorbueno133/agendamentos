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

    def atualizar(self, servico):
        conexao = conectar()
        cursor = conexao.cursor()

        cursor.execute(
            """
            UPDATE servicos
            SET nome = %s,
                duracao_minutos = %s,
                preco = %s
            WHERE id = %s
            """,
            (
                servico.nome,
                servico.duracao_minutos,
                servico.preco,
                servico.id,
            ),
        )

        conexao.commit()

        cursor.close()
        conexao.close()

        return servico

    def remover(self, servico_id):
        conexao = conectar()
        cursor = conexao.cursor()

        cursor.execute(
            "DELETE FROM servicos WHERE id = %s",
            (servico_id,),
        )

        conexao.commit()

        cursor.close()
        conexao.close()