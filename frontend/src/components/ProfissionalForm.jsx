import { useState, useEffect } from "react"; 

function ProfissionalForm({ aoSalvar, emEdicao, carregando }) { 
  const [nome, setNome] = useState(""); 
  const [especialidade, setEspecialidade] = useState(""); 

  useEffect(() => {
    if (emEdicao) {
      setNome(emEdicao.nome || "");
      setEspecialidade(emEdicao.especialidade || "");
    } else {
      setNome(""); 
      setEspecialidade("");
    }
  }, [emEdicao]);

  async function handleSubmit(evento) { 
    evento.preventDefault(); 
    await aoSalvar({ id: emEdicao?.id, nome, especialidade }); 
    if (!emEdicao) {
      setNome(""); 
      setEspecialidade(""); 
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
        placeholder="Ex.: Cabeleireiro" 
        value={especialidade} 
        onChange={(e) => setEspecialidade(e.target.value)} 
      /> 
      <button type="submit" disabled={carregando}>
        {carregando ? "Aguarde..." : (emEdicao ? "Atualizar" : "Salvar")}
      </button> 
    </form> 
  ); 
} 
  
export default ProfissionalForm;