import { useState } from "react"; 
import { login } from "../services/api"; 
  
function LoginForm({ aoEntrar }) { 
  const [email, setEmail] = useState(""); 
  const [senha, setSenha] = useState(""); 
  const [erro, setErro] = useState(null); 
  const [carregando, setCarregando] = useState(false); // 1. Adicionando o estado
  
  async function handleSubmit(evento) { 
    evento.preventDefault(); 
    try { 
      setErro(null);
      setCarregando(true); // 2. Inicia o loading ao clicar
      await login(email, senha); 
      aoEntrar(); 
    } catch (e) { 
      setErro(e.message); 
    } finally {
      setCarregando(false); // 3. Finaliza o loading dando certo ou errado
    }
  } 
  
  return ( 
    <form className="login-card" onSubmit={handleSubmit}> 
      <h1>Agendamentos SaaS</h1> 
      <p>Entre para acessar a agenda</p> 
      {erro && <p className="erro">{erro}</p>} 
      <input 
        type="email" 
        placeholder="E-mail" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      /> 
      <input 
        type="password" 
        placeholder="Senha" 
        value={senha} 
        onChange={(e) => setSenha(e.target.value)} 
      /> 
      {/* 4. Botão validando o estado carregando */}
      <button type="submit" disabled={carregando}>
        {carregando ? "Aguarde..." : "Entrar"}
      </button> 
    </form> 
  ); 
} 

export default LoginForm;