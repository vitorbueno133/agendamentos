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
import Modal from "./components/Modal";
import {
  listarClientes, criarCliente, atualizarCliente, deletarCliente,
  listarProfissionais, criarProfissional, atualizarProfissional, deletarProfissional,
  listarServicos, criarServico, atualizarServico, deletarServico,
  listarAgendamentos, criarAgendamento, cancelarAgendamento, concluirAgendamento, estarLogado, sair, 
} from "./services/api";
import "./App.css";
import LoginForm from "./components/LoginForm";
import RelatorioFaturamento from "./components/RelatorioFaturamento"; 

// Componente Carregando embutido diretamente no App.jsx
function Carregando({ texto = "Carregando..." }) { 
  return ( 
    <div className="carregando">
      <span className="carregando-icone" />
      <span>{texto}</span>
      <style>{`
        .carregando {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #6b7280;
          font-size: 14px;
          margin-bottom: 12px;
        }
        .carregando-icone {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          border: 2px solid #e5e7eb;
          border-top-color: #7a1fa2;
          display: inline-block;
          animation: girar 0.8s linear infinite;
        }
        @keyframes girar {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  ); 
}

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
  const [carregando, setCarregando] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);
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
    return <LoginForm aoEntrar={() => setLogado(true)} />; 
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

  function abrirModalNovo(entidade) {
    setEditando({ entidade, dados: null });
    setModalAberto(true);
  }

  function abrirModalEditar(entidade, dados) {
    setEditando({ entidade, dados });
    setModalAberto(true);
  }

  function fecharModal() {
    setModalAberto(false);
    setEditando({ entidade: null, dados: null });
  }

  async function salvar(entidade, dados) {
    setCarregando(true);
    try {
      if (entidade === "cliente") {
        dados.id ? await atualizarCliente(dados.id, dados) : await criarCliente(dados);
      } else if (entidade === "profissional") {
        dados.id ? await atualizarProfissional(dados.id, dados) : await criarProfissional(dados);
      } else if (entidade === "servico") {
        dados.id ? await atualizarServico(dados.id, dados) : await criarServico(dados);
      }

      mostrarToast(`${entidade.charAt(0).toUpperCase() + entidade.slice(1)} salvo(a) com sucesso!`, "sucesso");
      fecharModal();
      recarregarLista(entidade);
    } catch (e) {
      mostrarToast(e.message, "erro");
    } finally {
      setCarregando(false);
    }
  }

  async function confirmarExclusao() {
    const { entidade, id } = dialogoExclusao;
    setCarregando(true);
    try {
      if (entidade === "cliente") await deletarCliente(id);
      if (entidade === "profissional") await deletarProfissional(id);
      if (entidade === "servico") await deletarServico(id);

      mostrarToast(`${entidade.charAt(0).toUpperCase() + entidade.slice(1)} excluído(a) com sucesso!`, "sucesso");
      recarregarLista(entidade);
    } catch (e) {
      mostrarToast(e.message, "erro");
    } finally {
      setDialogoExclusao({ aberto: false, entidade: null, id: null });
      setCarregando(false);
    }
  }

  async function adicionarAgendamento(novoAgendamento) {
    setCarregando(true);
    try {
      await criarAgendamento(novoAgendamento);
      mostrarToast("Agendamento criado com sucesso!", "sucesso");
      listarAgendamentos().then(setAgendamentos);
    } catch (e) {
      mostrarToast(e.message, "erro");
    } finally {
      setCarregando(false);
    }
  }

  async function cancelarAgendamentoNaTela(id) {
    setCarregando(true);
    try {
      await cancelarAgendamento(id);
      mostrarToast("Agendamento cancelado com sucesso!", "sucesso");
      listarAgendamentos().then(setAgendamentos);
    } catch (e) {
      mostrarToast(e.message, "erro");
    } finally {
      setCarregando(false);
    }
  }

  async function concluirAgendamentoNaTela(id) {
    setCarregando(true);
    try {
      await concluirAgendamento(id);
      mostrarToast("Agendamento concluído com sucesso!", "sucesso");
      listarAgendamentos().then(setAgendamentos);
    } catch (e) {
      mostrarToast(e.message, "erro");
    } finally {
      setCarregando(false);
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
        mensagem={`Tem certeza que deseja excluir este registro?`}
        aoConfirmar={confirmarExclusao}
        aoCancelar={() => setDialogoExclusao({ aberto: false, entidade: null, id: null })}
        carregando={carregando}
      />

      <Menu 
        telaAtiva={telaAtiva} 
        aoTrocarTela={setTelaAtiva} 
        aoSair={() => { sair(); setLogado(false); }} 
      />

      {telaAtiva === "agenda" && (
        <div>
          <h1>Agenda</h1>
          <div style={{ background: "var(--cor-superficie)", padding: "20px", borderRadius: "var(--raio)", marginBottom: "24px", boxShadow: "var(--sombra-card)" }}>
            <h3 style={{ marginTop: 0, color: "var(--cor-primaria)", textAlign: "center" }}>Novo Agendamento</h3>
            <NovoAgendamentoForm
              clientes={clientes}
              profissionais={profissionais}
              servicos={servicos}
              aoSalvar={adicionarAgendamento}
              carregando={carregando}
            />
          </div>
          <AgendaList
            agendamentos={agendamentos}
            aoCancelar={cancelarAgendamentoNaTela}
            aoConcluir={concluirAgendamentoNaTela}
            carregando={carregando}
          />
        </div>
      )}

      {telaAtiva === "clientes" && (
        <div>
          <div className="cabecalho-tela">
            <h1>Clientes</h1>
            <div className="container-botao">
              <button className="botao-novo" onClick={() => abrirModalNovo("cliente")}>+ Novo Cliente</button>
            </div>
          </div>
          
          {carregando && <Carregando />}

          <Modal aberto={modalAberto && editando.entidade === "cliente"} titulo={editando.dados ? "Editar Cliente" : "Novo Cliente"} aoFechar={fecharModal}>
            <ClienteForm emEdicao={editando.dados} aoSalvar={(dados) => salvar("cliente", dados)} carregando={carregando} />
          </Modal>

          <ClienteList
            clientes={clientes}
            aoEditar={(dados) => abrirModalEditar("cliente", dados)}
            aoExcluir={(dados) => setDialogoExclusao({ aberto: true, entidade: "cliente", id: dados.id })}
          />
        </div>
      )}

      {telaAtiva === "profissionais" && (
        <div>
          <div className="cabecalho-tela">
            <h1>Profissionais</h1>
            <div className="container-botao">
              <button className="botao-novo" onClick={() => abrirModalNovo("profissional")}>+ Novo Profissional</button>
            </div>
          </div>
          
          {carregando && <Carregando />}

          <Modal aberto={modalAberto && editando.entidade === "profissional"} titulo={editando.dados ? "Editar Profissional" : "Novo Profissional"} aoFechar={fecharModal}>
            <ProfissionalForm emEdicao={editando.dados} aoSalvar={(dados) => salvar("profissional", dados)} carregando={carregando} />
          </Modal>

          <ProfissionalList
            profissionais={profissionais}
            aoEditar={(dados) => abrirModalEditar("profissional", dados)}
            aoExcluir={(dados) => setDialogoExclusao({ aberto: true, entidade: "profissional", id: dados.id })}
          />
        </div>
      )}

      {telaAtiva === "servicos" && (
        <div>
          <div className="cabecalho-tela">
            <h1>Serviços</h1>
            <div className="container-botao">
              <button className="botao-novo" onClick={() => abrirModalNovo("servico")}>+ Novo Serviço</button>
            </div>
          </div>

          {carregando && <Carregando />}

          <Modal aberto={modalAberto && editando.entidade === "servico"} titulo={editando.dados ? "Editar Serviço" : "Novo Serviço"} aoFechar={fecharModal}>
            <ServicoForm emEdicao={editando.dados} aoSalvar={(dados) => salvar("servico", dados)} carregando={carregando} />
          </Modal>

          <ServicoList
            servicos={servicos}
            aoEditar={(dados) => abrirModalEditar("servico", dados)}
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