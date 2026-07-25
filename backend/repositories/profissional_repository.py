from config.database import conectar 
from models.profissional import Profissional 
  
  
class ProfissionalRepository: 
    def adicionar(self, profissional): 
        conexao = conectar() 
        cursor = conexao.cursor() 
        cursor.execute( 
            "INSERT INTO profissionais (nome, especialidade) VALUES (%s, %s)", 
            (profissional.nome, profissional.especialidade), 
        ) 
        conexao.commit() 
        cursor.close() 
        conexao.close() 
  
    def listar_todos(self): 
        conexao = conectar() 
        cursor = conexao.cursor() 
        cursor.execute("SELECT id, nome, especialidade FROM profissionais") 
        linhas = cursor.fetchall() 
        cursor.close() 
        conexao.close() 
        return [Profissional(*linha) for linha in linhas] 