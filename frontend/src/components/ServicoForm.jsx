import { useState, useEffect } from "react"; 
  
function ServicoForm({ aoSalvar, emEdicao, carregando }) { 
  const [nome, setNome] = useState(""); 
  const [duracaoMinutos, setDuracaoMinutos] = useState(""); 
  const [preco, setPreco] = useState(""); 

  useEffect(() => {
    if (emEdicao) {
      setNome(emEdicao.nome || "");
      setDuracaoMinutos(emEdicao.duracao_minutos || "");
      setPreco(emEdicao.preco || "");
    } else {
      setNome(""); 
      setDuracaoMinutos(""); 
      setPreco("");
    }
  }, [emEdicao]);
  
  function handleSubmit(evento) { 
    evento.preventDefault(); 
    aoSalvar({ 
      id: emEdicao?.id,
      nome, 
      duracao_minutos: Number(duracaoMinutos),
      preco: Number(preco), 
    }); 
    if (!emEdicao) {
      setNome(""); 
      setDuracaoMinutos(""); 
      setPreco(""); 
    }
  } 
  
  return ( 
    <form onSubmit={handleSubmit}> 
      <input 
        placeholder="Nome" 
        value={nome} 
        onChange={(e) => setNome(e.target.value)} 
      /> 
      <input 
        placeholder="Duração (minutos)" 
        type="number" 
        value={duracaoMinutos} 
        onChange={(e) => setDuracaoMinutos(e.target.value)} 
      /> 
      <input 
        placeholder="Preço" 
        type="number" 
        value={preco} 
        onChange={(e) => setPreco(e.target.value)} 
      /> 
      <button type="submit" disabled={carregando}>
        {carregando ? "Aguarde..." : (emEdicao ? "Atualizar" : "Salvar")}
      </button> 
    </form> 
  ); 
} 
  
export default ServicoForm;