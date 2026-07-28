import { useState } from "react"; 
  
function ProfissionalForm({ aoSalvar }) { 
  const [nome, setNome] = useState(""); 
  const [especialidade, setEspecialidade] = 
useState(""); 
  
  function handleSubmit(evento) { 
    evento.preventDefault(); 
    aoSalvar({ nome, especialidade }); 
    setNome(""); 
    setEspecialidade(""); 
  } 
  
  return ( 
    <form onSubmit={handleSubmit}> 
      <input 
        placeholder="Nome" 
        value={nome} 
        onChange={(e) => setNome(e.target.value)} 
      /> 
      <input 
        placeholder="Especialidade" 
        value={especialidade} 
        onChange={(e) => 
setEspecialidade(e.target.value)} 
      /> 
      <button type="submit">Salvar</button> 
    </form> 
  ); 
} 
export default ProfissionalForm; 