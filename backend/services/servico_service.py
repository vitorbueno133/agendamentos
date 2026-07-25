from repositories.servico_repository import ServicoRepository
from models.servico import Servico


class ServicoService:
    def __init__(self):
        self.repository = ServicoRepository()

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