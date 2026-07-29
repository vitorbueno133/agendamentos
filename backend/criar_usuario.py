from werkzeug.security import generate_password_hash 
from config.database import conectar 
  
conexao = conectar() 
cursor = conexao.cursor() 
cursor.execute(     "INSERT INTO usuarios (nome, email, senha_hash) VALUES (%s, %s, %s)",     ("Administrador", "vitorbuen@gmail.com", generate_password_hash("vitor124")), 
) 
conexao.commit() 
cursor.close() 
conexao.close() 
print("Usuario vitorbueno@gmail.com criado com sucesso.")