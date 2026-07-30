from repositories.servico_repository import ServicoRepository
from models.servico import Servico
from repositories.agendamento_repository import AgendamentoRepository

class ServicoService:
    def __init__(self):
        self.repository = ServicoRepository()
        self.agendamentos = AgendamentoRepository()

    def adicionar_servico(self, nome, duracao_minutos, preco):
        existentes = [s.nome.lower() for s in self.repository.listar_todos()]

        if nome.lower() in existentes:
            raise ValueError(f"Já existe um serviço chamado {nome}.")

        servico = Servico(
            None,
            nome,
            duracao_minutos,
            preco,
        )

        self.repository.adicionar(servico)

        return servico

    def listar_servicos(self):
        return self.repository.listar_todos()

    def atualizar_servico(
        self,
        servico_id,
        nome,
        duracao_minutos,
        preco,
    ):
        servico = Servico(
            servico_id,
            nome,
            duracao_minutos,
            preco,
        )

        return self.repository.atualizar(servico)

    def remover_servico(self, servico_id):
        if self.agendamentos.existe_agendamento_para_servico(servico_id):
            raise ValueError(
                "Não é possível excluir um serviço com agendamentos."
            )

        self.repository.remover(servico_id)