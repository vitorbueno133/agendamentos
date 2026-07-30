from config.database import conectar 
from models.profissional import Profissional 
  
  
class ProfissionalRepository: 
    def adicionar(self, profissional): 
        conexao = conectar() 
        cursor = conexao.cursor() 
        cursor.execute( 
            "INSERT INTO profissionais (nome, especialidade) VALUES (%s, %s) RETURNING id", 
            (profissional.nome, 
profissional.especialidade), 
        ) 
        novo_id = cursor.fetchone()[0] 
        conexao.commit() 
        cursor.close() 
        conexao.close() 
        profissional.id = novo_id 
        return profissional 
  
    def listar_todos(self): 
        conexao = conectar() 
        cursor = conexao.cursor() 
        cursor.execute("SELECT id, nome, especialidade FROM profissionais") 
        linhas = cursor.fetchall() 
        cursor.close() 
        conexao.close() 
        return [Profissional(*linha) for linha in linhas]

    def atualizar(self, profissional):
        conexao = conectar()
        cursor = conexao.cursor()

        cursor.execute(
            """
            UPDATE profissionais
            SET nome = %s,
                especialidade = %s
            WHERE id = %s
            """,
            (
                profissional.nome,
                profissional.especialidade,
                profissional.id,
            ),
        )

        conexao.commit()

        cursor.close()
        conexao.close()

        return profissional

    def remover(self, profissional_id):
        conexao = conectar()
        cursor = conexao.cursor()

        cursor.execute(
            "DELETE FROM profissionais WHERE id = %s", (profissional_id,),
        )

        conexao.commit()

        cursor.close()
        conexao.close()