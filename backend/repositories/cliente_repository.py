from config.database import conectar 
from models.cliente import Cliente 
  
  
class ClienteRepository: 
    def adicionar(self, cliente): 
        conexao = conectar() 
        cursor = conexao.cursor() 
        cursor.execute( 
            "INSERT INTO clientes (nome, telefone, email) VALUES (%s, %s, %s)", 
            (cliente.nome, cliente.telefone, cliente.email), 
        ) 
        conexao.commit() 
        cursor.close() 
        conexao.close() 
  
    def listar_todos(self): 
        conexao = conectar() 
        cursor = conexao.cursor() 
        cursor.execute("SELECT id, nome, telefone, email FROM clientes") 
        linhas = cursor.fetchall() 
        cursor.close() 
        conexao.close() 
        return [Cliente(*linha) for linha in linhas]