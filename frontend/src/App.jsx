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
  listarClientes, criarCliente, 
  listarProfissionais, criarProfissional, 
  listarServicos, criarServico, 
  listarAgendamentos, criarAgendamento, 
} from "./services/api"; 
  
function App() { 
  const [telaAtiva, setTelaAtiva] = 
useState("agenda"); 
  const [clientes, setClientes] = useState([]); 
  const [profissionais, setProfissionais] = 
useState([]); 
  const [servicos, setServicos] = useState([]); 
  const [agendamentos, setAgendamentos] = 
useState([]); 
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
  
  async function 
adicionarProfissional(novoProfissional) { 
    try {
       setErro(null); 
      const criado = await 
criarProfissional(novoProfissional); 
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
  
  async function adicionarAgendamento(novoAgendamento) 
{ 
    try { 
      setErro(null); 
      await criarAgendamento(novoAgendamento); 
      listarAgendamentos().then(setAgendamentos); 
    } catch (e) { 
      setErro(e.message); 
    } 
  } 
  
  return ( 
    <div> 
      <Menu telaAtiva={telaAtiva} 
aoTrocarTela={setTelaAtiva} /> 
      {erro && <p style={{ color: "red" }}>{erro}</p>} 
  
      {telaAtiva === "agenda" && ( 
        <div> 
          <h1>Agenda</h1>
           <NovoAgendamentoForm 
            clientes={clientes} 
            profissionais={profissionais} 
            servicos={servicos} 
            aoSalvar={adicionarAgendamento} 
          /> 
          <AgendaList agendamentos={agendamentos} /> 
        </div> 
      )} 
  
      {telaAtiva === "clientes" && ( 
        <div> 
          <h1>Clientes</h1> 
          <ClienteForm aoSalvar={adicionarCliente} /> 
          <ClienteList clientes={clientes} /> 
        </div> 
      )} 
  
      {telaAtiva === "profissionais" && ( 
        <div> 
          <h1>Profissionais</h1> 
          <ProfissionalForm aoSalvar={adicionarProfissional} /> 
          <ProfissionalList profissionais={profissionais} /> 
        </div> 
      )} 
  
      {telaAtiva === "servicos" && ( 
        <div> 
          <h1>Serviços</h1> 
          <ServicoForm aoSalvar={adicionarServico} /> 
          <ServicoList servicos={servicos} /> 
        </div> 
      )} 
    </div> 
  ); 
} 
export default App; 