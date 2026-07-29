from werkzeug.security import generate_password_hash 
from config.database import conectar 
  
conexao = conectar() 
cursor = conexao.cursor() 
cursor.execute(     "INSERT INTO usuarios (nome, email, senha_hash) VALUES (%s, %s, %s)",     ("Administrador", "vitorbueno@gmail.com", generate_password_hash("vitor123")), 
) 
conexao.commit() 
cursor.close() 
conexao.close() 
print("Usuario vitor@gmail.com criado com sucesso.")