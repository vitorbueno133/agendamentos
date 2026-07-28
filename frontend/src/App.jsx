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

import {
  listarClientes,
  criarCliente,
  listarProfissionais,
  criarProfissional,
  listarServicos,
  criarServico,
  listarAgendamentos,
  criarAgendamento,
} from "./services/api";

function App() {
  const [telaAtiva, setTelaAtiva] = useState("agenda");
  const [clientes, setClientes] = useState([]);
  const [profissionais, setProfissionais] = useState([]);
  const [servicos, setServicos] = useState([]);
  const [agendamentos, setAgendamentos] = useState([]);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    listarClientes().then(setClientes);
    listarProfissionais().then(setProfissionais);
    listarServicos().then(setServicos);
    listarAgendamentos().then(setAgendamentos);
  }, []);

  async function adicionarCliente(novoCliente) {
    try {
      setErro(null);
      const criado = await criarCliente(novoCliente);
      setClientes([...clientes, criado]);
    } catch (e) {
      setErro(e.message);
    }
  }

  async function adicionarProfissional(novoProfissional) {
    try {
      setErro(null);
      const criado = await criarProfissional(novoProfissional);
      setProfissionais([...profissionais, criado]);
    } catch (e) {
      setErro(e.message);
    }
  }

  async function adicionarServico(novoServico) {
    try {
      setErro(null);
      const criado = await criarServico(novoServico);
      setServicos([...servicos, criado]);
    } catch (e) {
      setErro(e.message);
    }
  }

  async function adicionarAgendamento(novoAgendamento) {
    try {
      setErro(null);
      await criarAgendamento(novoAgendamento);
      listarAgendamentos().then(setAgendamentos);
    } catch (e) {
      setErro(e.message);
    }
  }

  function tituloTela() {
    switch (telaAtiva) {
      case "clientes":
        return "Clientes";
      case "profissionais":
        return "Profissionais";
      case "servicos":
        return "Serviços";
      default:
        return "Agenda";
    }
  }

  function subtituloTela() {
    switch (telaAtiva) {
      case "clientes":
        return "Cadastre e gerencie seus clientes.";
      case "profissionais":
        return "Gerencie os profissionais da empresa.";
      case "servicos":
        return "Configure os serviços oferecidos.";
      default:
        return "Visualize e organize todos os agendamentos.";
    }
  }

  return (
    <div className="app">
      <Menu telaAtiva={telaAtiva} aoTrocarTela={setTelaAtiva} />

      <main className="container">

        <section className="hero">

          <span className="badge">
            Sistema de Gestão
          </span>

          <h1>{tituloTela()}</h1>

          <p>{subtituloTela()}</p>

        </section>

        {erro && (
          <div className="erro">
            {erro}
          </div>
        )}

        {telaAtiva === "agenda" && (
          <>

            <section className="card">
              <NovoAgendamentoForm
                clientes={clientes}
                profissionais={profissionais}
                servicos={servicos}
                aoSalvar={adicionarAgendamento}
              />
            </section>

            <section className="card">
              <AgendaList agendamentos={agendamentos} />
            </section>

          </>
        )}

        {telaAtiva === "clientes" && (
          <>
            <section className="card">
              <ClienteForm aoSalvar={adicionarCliente} />
            </section>

            <section className="card">
              <ClienteList clientes={clientes} />
            </section>
          </>
        )}

        {telaAtiva === "profissionais" && (
          <>
            <section className="card">
              <ProfissionalForm
                aoSalvar={adicionarProfissional}
              />
            </section>

            <section className="card">
              <ProfissionalList
                profissionais={profissionais}
              />
            </section>
          </>
        )}

        {telaAtiva === "servicos" && (
          <>
            <section className="card">
              <ServicoForm
                aoSalvar={adicionarServico}
              />
            </section>

            <section className="card">
              <ServicoList
                servicos={servicos}
              />
            </section>
          </>
        )}

      </main>
    </div>
  );
}

export default App;