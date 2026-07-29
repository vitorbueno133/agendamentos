import { useState } from "react"; 
  
function mascaraTelefone(valor) { 
  const nums = valor.replace(/\D/g, "").slice(0, 11); 
  if (nums.length <= 10) { 
    return nums.replace(/(\d{2})(\d{4})(\d{0,4})/, 
"($1) $2-$3").replace(/-$/, ""); 
  } 
  return nums.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3").replace(/-$/, ""); 
} 
  
function ClienteForm({ aoSalvar }) {
   const [nome, setNome] = useState(""); 
  const [telefone, setTelefone] = useState(""); 
  const [email, setEmail] = useState(""); 
  const [toast, setToast] = useState(null); 
  
  function mostrarToast(msg, tipo = "sucesso") { 
    setToast({ msg, tipo }); 
    setTimeout(() => setToast(null), 3000); 
  } 
  
  async function handleSubmit(evento) { 
    evento.preventDefault(); 
    try { 
      await aoSalvar({ nome, telefone, email }); 
      setNome(""); setTelefone(""); setEmail(""); 
      mostrarToast("Cliente salvo com sucesso!"); 
    } catch (e) { 
      mostrarToast(e.message || "Erro ao salvar.", 
"erro"); 
    } 
  } 
  
  return ( 
    <div> 
      {toast && <div className={`toast toast${toast.tipo}`}>{toast.msg}</div>} 
      <form onSubmit={handleSubmit}> 
        <input placeholder="Nome" value={nome} 
          onChange={(e) => setNome(e.target.value)} required /> 
        <input placeholder="Telefone: (00) 00000-0000" value={telefone} 
          onChange={(e) => 
setTelefone(mascaraTelefone(e.target.value))} /> 
        <input placeholder="E-mail" type="email" value={email} 
          onChange={(e) => setEmail(e.target.value)} 
/> 
        <button type="submit">Salvar</button> 
</form> 
</div> 
); 
} 
export default ClienteForm;