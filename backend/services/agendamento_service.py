from repositories.agendamento_repository import AgendamentoRepository
from repositories.cliente_repository import ClienteRepository
from repositories.profissional_repository import ProfissionalRepository
from repositories.servico_repository import ServicoRepository
from models.agendamento import Agendamento
from datetime import datetime, timedelta


class AgendamentoService:
    def __init__(self):
        self.repository = AgendamentoRepository()
        self.clientes = ClienteRepository()
        self.profissionais = ProfissionalRepository()
        self.servicos = ServicoRepository()

    def _buscar_ou_falhar(self, lista, entidade_id, nome_entidade):
        """Busca uma entidade por id em uma lista; levanta ValueError se não existir."""
        item = next((e for e in lista if e.id == entidade_id), None)

        if item is None:
            raise ValueError(f"{nome_entidade} não encontrado.")

        return item


    def criar_agendamento(self, cliente_id, profissional_id, servico_id, data_hora):
        """Cria um agendamento, validando cliente, profissional, serviço e conflito de horário."""

        self._buscar_ou_falhar(
            self.clientes.listar_todos(),
            cliente_id,
            "Cliente",
        )

        self._buscar_ou_falhar(
            self.profissionais.listar_todos(),
            profissional_id,
            "Profissional",
        )

        servico = self._buscar_ou_falhar(
            self.servicos.listar_todos(),
            servico_id,
            "Serviço",
        )

        inicio = datetime.fromisoformat(data_hora)
        fim = inicio + timedelta(minutes=servico.duracao_minutos)

        conflitos = self.repository.listar_por_profissional_e_periodo(
            profissional_id,
            inicio.isoformat(),
            fim.isoformat(),
        )

        if conflitos:
            raise ValueError(
                "Este horário conflita com outro agendamento do profissional."
            )

        agendamento = Agendamento(
            None,
            cliente_id,
            profissional_id,
            servico_id,
            data_hora,
        )

        self.repository.adicionar(agendamento)

        return agendamento

    def proximos_agendamentos(self, profissional_id, minutos=15):
        agora = datetime.now()
        limite = agora + timedelta(minutes=minutos)

        return self.repository.listar_por_profissional_e_periodo(
            profissional_id,
            agora.isoformat(),
            limite.isoformat(),
        )

    def cancelar_agendamento(self, agendamento_id):
        agendamento = self.repository.buscar_por_id(agendamento_id)

        if agendamento is None:
            raise ValueError("Agendamento não encontrado.")

        if agendamento.status == "concluido":
            raise ValueError(
                "Não é possível cancelar um agendamento já concluído."
            )

        self.repository.atualizar_status(
            agendamento_id,
            "cancelado",
        )

    def concluir_agendamento(self, agendamento_id):
        agendamento = self.repository.buscar_por_id(agendamento_id)

        if agendamento is None:
            raise ValueError("Agendamento não encontrado.")

        self.repository.atualizar_status(
            agendamento_id,
            "concluido",
        )

    def historico_do_cliente(self, cliente_id):
        return self.repository.historico_do_cliente(cliente_id)

    def relatorio_faturamento(self): 
        linhas = self.repository.faturamento_por_profissional() 
        return [ 
            {"profissional": nome, "atendimentos": total, "faturamento": float(faturamento)} 
            for nome, total, faturamento in linhas 
        ] 