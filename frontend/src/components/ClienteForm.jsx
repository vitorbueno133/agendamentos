import { useState, useEffect } from "react"; 

function mascaraTelefone(valor) { 
  const nums = valor.replace(/\D/g, "").slice(0, 11); 
  if (nums.length <= 10) { 
    return nums.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3").replace(/-$/, ""); 
  } 
  return nums.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3").replace(/-$/, ""); 
} 

function ClienteForm({ aoSalvar, emEdicao }) {
  const [nome, setNome] = useState(""); 
  const [telefone, setTelefone] = useState(""); 
  const [email, setEmail] = useState(""); 

  useEffect(() => {
    if (emEdicao) {
      setNome(emEdicao.nome || "");
      setTelefone(emEdicao.telefone || "");
      setEmail(emEdicao.email || "");
    } else {
      setNome(""); 
      setTelefone(""); 
      setEmail("");
    }
  }, [emEdicao]);
  
  async function handleSubmit(evento) { 
    evento.preventDefault(); 
    await aoSalvar({ id: emEdicao?.id, nome, telefone, email }); 
    if (!emEdicao) {
      setNome(""); 
      setTelefone(""); 
      setEmail(""); 
    }
  } 
  
  return ( 
    <form onSubmit={handleSubmit}> 
      <input 
        placeholder="Nome" 
        value={nome} 
        onChange={(e) => setNome(e.target.value)} 
        required 
      /> 
      <input 
        placeholder="Telefone: (00) 00000-0000" 
        value={telefone} 
        onChange={(e) => setTelefone(mascaraTelefone(e.target.value))} 
      /> 
      <input 
        placeholder="E-mail" 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      /> 
      <button type="submit">{emEdicao ? "Atualizar" : "Salvar"}</button> 
    </form> 
  ); 
} 

export default ClienteForm;