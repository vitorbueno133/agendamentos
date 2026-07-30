import { useEffect, useState } from "react";
import Menu from "./components/Menu";
import AgendaList from "./components/AgendaList";
import NovoAgendamentoForm from "./components/NovoAgendamentoForm";
import ClienteList from "./components/ClienteList";
import ClienteForm from "./components/ClienteForm";
import ProfissionalList from "./components/ProfissionalList";
import ProfissionalForm from "./components/ProfissionalForm";
import ServicoList from "./components/ServicoList";
import ServicoForm from "./components/ServicoForm";
import Toast from "./components/Toast";
import ConfirmDialog from "./components/ConfirmDialog";
import {
  listarClientes, criarCliente, atualizarCliente, deletarCliente,
  listarProfissionais, criarProfissional, atualizarProfissional, deletarProfissional,
  listarServicos, criarServico, atualizarServico, deletarServico,
  listarAgendamentos, criarAgendamento, cancelarAgendamento, concluirAgendamento, estarLogado, sair, 
} from "./services/api";
import "./App.css";
import LoginForm from "./components/LoginForm";
import RelatorioFaturamento from "./components/RelatorioFaturamento"; 

function App() {
  const [telaAtiva, setTelaAtiva] = useState("agenda");
  
  // Dados
  const [clientes, setClientes] = useState([]);
  const [profissionais, setProfissionais] = useState([]);
  const [servicos, setServicos] = useState([]);
  const [agendamentos, setAgendamentos] = useState([]);
  const [logado, setLogado] = useState(estarLogado()); 
  // Controle de UI
  const [toast, setToast] = useState(null);
  const [editando, setEditando] = useState({ entidade: null, dados: null });
  const [dialogoExclusao, setDialogoExclusao] = useState({ aberto: false, entidade: null, id: null });

  useEffect(() => { 
  if (!logado) return; 
  listarClientes().then(setClientes); 
  listarProfissionais().then(setProfissionais); 
  listarServicos().then(setServicos); 
  listarAgendamentos().then(setAgendamentos); 
}, [logado]); 

if (!logado) { 
  return <LoginForm aoEntrar={() => setLogado(true)} 
/>; 
} 

  async function carregarDadosIniciais() {
    listarClientes().then(setClientes);
    listarProfissionais().then(setProfissionais);
    listarServicos().then(setServicos);
    listarAgendamentos().then(setAgendamentos);
  }

  function mostrarToast(mensagem, tipo = "sucesso") {
    setToast({ mensagem, tipo });
  }

  async function recarregarLista(entidade) {
    if (entidade === "cliente") listarClientes().then(setClientes);
    if (entidade === "profissional") listarProfissionais().then(setProfissionais);
    if (entidade === "servico") listarServicos().then(setServicos);
  }

  // Função centralizada para decidir entre Criar ou Atualizar
  async function salvar(entidade, dados) {
    try {
      if (entidade === "cliente") {
        dados.id ? await atualizarCliente(dados.id, dados) : await criarCliente(dados);
      } else if (entidade === "profissional") {
        dados.id ? await atualizarProfissional(dados.id, dados) : await criarProfissional(dados);
      } else if (entidade === "servico") {
        dados.id ? await atualizarServico(dados.id, dados) : await criarServico(dados);
      }

      mostrarToast(`${entidade} salvo(a) com sucesso!`, "sucesso");
      setEditando({ entidade: null, dados: null });
      recarregarLista(entidade);
    } catch (e) {
      mostrarToast(e.message, "erro");
    }
  }

  // Função centralizada para processar a exclusão pelo Modal
  async function confirmarExclusao() {
    const { entidade, id } = dialogoExclusao;
    try {
      if (entidade === "cliente") await deletarCliente(id);
      if (entidade === "profissional") await deletarProfissional(id);
      if (entidade === "servico") await deletarServico(id);

      mostrarToast(`${entidade} excluído(a) com sucesso!`, "sucesso");
      recarregarLista(entidade);
    } catch (e) {
      mostrarToast(e.message, "erro");
    } finally {
      setDialogoExclusao({ aberto: false, entidade: null, id: null });
    }
  }

  // Funções de Agendamento mantidas conforme original
  async function adicionarAgendamento(novoAgendamento) {
    try {
      await criarAgendamento(novoAgendamento);
      mostrarToast("Agendamento criado com sucesso!", "sucesso");
      listarAgendamentos().then(setAgendamentos);
    } catch (e) {
      mostrarToast(e.message, "erro");
    }
  }

  async function cancelarAgendamentoNaTela(id) {
    try {
      await cancelarAgendamento(id);
      mostrarToast("Agendamento cancelado com sucesso!", "sucesso");
      listarAgendamentos().then(setAgendamentos);
    } catch (e) {
      mostrarToast(e.message, "erro");
    }
  }

  async function concluirAgendamentoNaTela(id) {
    try {
      await concluirAgendamento(id);
      mostrarToast("Agendamento concluído com sucesso!", "sucesso");
      listarAgendamentos().then(setAgendamentos);
    } catch (e) {
      mostrarToast(e.message, "erro");
    }
  }

  return (
    <div>
      <Toast 
        mensagem={toast?.mensagem} 
        tipo={toast?.tipo} 
        aoFechar={() => setToast(null)} 
      />

      <ConfirmDialog
        aberto={dialogoExclusao.aberto}
        mensagem={`Tem certeza que deseja excluir este(a) ${dialogoExclusao.entidade}?`}
        aoConfirmar={confirmarExclusao}
        aoCancelar={() => setDialogoExclusao({ aberto: false, entidade: null, id: null })}
      />

      <Menu telaAtiva={telaAtiva} aoTrocarTela={setTelaAtiva} />

      <button className="botao-sair" onClick={() => { 
sair(); setLogado(false); }}> 
Sair 
</button> 

      {telaAtiva === "agenda" && (
        <div>
          <h1>Agenda</h1>
          <NovoAgendamentoForm
            clientes={clientes}
            profissionais={profissionais}
            servicos={servicos}
            aoSalvar={adicionarAgendamento}
          />
          <AgendaList
            agendamentos={agendamentos}
            aoCancelar={cancelarAgendamentoNaTela}
            aoConcluir={concluirAgendamentoNaTela}
          />
        </div>
      )}

      {telaAtiva === "clientes" && (
        <div>
          <h1>Clientes</h1>
          <ClienteForm
            emEdicao={editando.entidade === "cliente" ? editando.dados : null}
            aoSalvar={(dados) => salvar("cliente", dados)}
          />
          <ClienteList
            clientes={clientes}
            aoEditar={(dados) => setEditando({ entidade: "cliente", dados })}
            aoExcluir={(dados) => setDialogoExclusao({ aberto: true, entidade: "cliente", id: dados.id })}
          />
        </div>
      )}

      {telaAtiva === "profissionais" && (
        <div>
          <h1>Profissionais</h1>
          <ProfissionalForm
            emEdicao={editando.entidade === "profissional" ? editando.dados : null}
            aoSalvar={(dados) => salvar("profissional", dados)}
          />
          <ProfissionalList
            profissionais={profissionais}
            aoEditar={(dados) => setEditando({ entidade: "profissional", dados })}
            aoExcluir={(dados) => setDialogoExclusao({ aberto: true, entidade: "profissional", id: dados.id })}
          />
        </div>
      )}

      {telaAtiva === "servicos" && (
        <div>
          <h1>Serviços</h1>
          <ServicoForm
            emEdicao={editando.entidade === "servico" ? editando.dados : null}
            aoSalvar={(dados) => salvar("servico", dados)}
          />
          <ServicoList
            servicos={servicos}
            aoEditar={(dados) => setEditando({ entidade: "servico", dados })}
            aoExcluir={(dados) => setDialogoExclusao({ aberto: true, entidade: "servico", id: dados.id })}
          />
        </div>
      )}

      {telaAtiva === "relatorios" && ( 
<div> 
<h1>Relatório de Faturamento</h1> 
<RelatorioFaturamento /> 
</div> 
)}
    </div>
  );
}

export default App;