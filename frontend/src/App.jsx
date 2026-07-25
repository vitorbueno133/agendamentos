import { useEffect, useState } from "react"; 
import ClienteList from "./components/ClienteList"; 
import ClienteForm from "./components/ClienteForm"; 
import { listarClientes, criarCliente } from 
"./services/api"; 
  
function App() { 
  const [clientes, setClientes] = useState([]); 
  const [erro, setErro] = useState(null); 
  
  useEffect(() => { 
    listarClientes().then(setClientes); 
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
  
  return ( 
    <div> 
      <h1>Clientes</h1> 
      {erro && <p style={{ color: "red" }}>{erro}</p>} 
      <ClienteForm aoSalvar={adicionarCliente} /> 
      <ClienteList clientes={clientes} /> 
    </div> 
  ); 
} 
  
export default App;