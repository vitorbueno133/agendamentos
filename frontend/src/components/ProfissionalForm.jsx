import { useState } from "react"; 

function ProfissionalForm({ aoSalvar }) { 
const [nome, setNome] = useState(""); 
const [especialidade, setEspecialidade] = useState(""); 
const [toast, setToast] = useState(null); 
function mostrarToast(msg, tipo = "sucesso") { 
setToast({ msg, tipo }); 
setTimeout(() => setToast(null), 3000); 
} 
async function handleSubmit(evento) { 
evento.preventDefault(); 
try { 
   await aoSalvar({ nome, especialidade }); 
      setNome(""); setEspecialidade(""); 
      mostrarToast("Profissional salvo com sucesso!"); 
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
        <input placeholder="Ex.: Cabeleireiro" value={especialidade} 
          onChange={(e) => setEspecialidade(e.target.value)} /> 
        <button type="submit">Salvar</button> 
      </form> 
    </div> 
  ); 
} 
  
export default ProfissionalForm;