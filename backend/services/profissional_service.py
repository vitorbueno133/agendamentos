from repositories.profissional_repository import ProfissionalRepository 
from models.profissional import Profissional 
from repositories.agendamento_repository import AgendamentoRepository
  
class ProfissionalService: 
    def __init__(self): 
        self.repository = ProfissionalRepository() 
        self.agendamentos = AgendamentoRepository()
  
    def adicionar_profissional(self, nome, especialidade): 
        existentes = [p.nome.lower() for p in self.repository.listar_todos()] 
        if nome.lower() in existentes: 
            raise ValueError(f"Já existe um profissional chamado {nome}.") 
        profissional = Profissional(None, nome, especialidade) 
        return self.repository.adicionar(profissional) 
        return profissional     
  
    def listar_profissionais(self): 
        return self.repository.listar_todos() 

    def atualizar_profissional(self, profissional_id, nome, especialidade):
        profissional = Profissional(
            profissional_id,
            nome,
            especialidade,
        )

        return self.repository.atualizar(profissional)

    def remover_profissional(self, profissional_id):
        if self.agendamentos.existe_agendamento_para_profissional(profissional_id):
            raise ValueError(
                "Não é possível excluir um profissional com agendamentos."
            )

        self.repository.remover(profissional_id)