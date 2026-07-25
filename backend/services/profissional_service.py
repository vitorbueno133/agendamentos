from repositories.profissional_repository import ProfissionalRepository 
from models.profissional import Profissional 
  
  
class ProfissionalService: 
    def __init__(self): 
        self.repository = ProfissionalRepository() 
  
    def adicionar_profissional(self, nome, 
especialidade): 
        existentes = [p.nome.lower() for p in 
self.repository.listar_todos()] 
        if nome.lower() in existentes: 
            raise ValueError(f"Já existe um profissional chamado {nome}.") 
        profissional = Profissional(None, nome, especialidade) 
        self.repository.adicionar(profissional) 
        return profissional 
  
    def listar_profissionais(self):
         return self.repository.listar_todos()