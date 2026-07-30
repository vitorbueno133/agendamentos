from repositories.cliente_repository import ClienteRepository 
from models.cliente import Cliente 
from repositories.agendamento_repository import AgendamentoRepository

class ClienteService: 
    def __init__(self): 
        self.repository = ClienteRepository()
        self.agendamentos = AgendamentoRepository()
    def adicionar_cliente(self, nome, telefone, email): 
        cliente = Cliente(None, nome, telefone, email) 
        self.repository.adicionar(cliente) 
        return cliente 
  
    def listar_clientes(self): 
        return self.repository.listar_todos()

    def remover_cliente(self, cliente_id):
        if self.agendamentos.existe_agendamento_para_cliente(cliente_id):
            raise ValueError(
                "Não é possível excluir um cliente com agendamentos."
            )
        self.repository.remover(cliente_id)


    def atualizar_cliente(self, cliente_id, nome, telefone, email):
        cliente = Cliente(cliente_id, nome, telefone, email)
        return self.repository.atualizar(cliente)