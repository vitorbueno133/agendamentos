import { useState } from "react"; 
  
function ServicoForm({ aoSalvar }) { 
  const [nome, setNome] = useState(""); 
  const [duracaoMinutos, setDuracaoMinutos] = 
useState(""); 
  const [preco, setPreco] = useState(""); 
  
  function handleSubmit(evento) { 
    evento.preventDefault(); 
    aoSalvar({ 
      nome, 
      duracao_minutos: Number(duracaoMinutos),
       preco: Number(preco), 
    }); 
    setNome(""); 
    setDuracaoMinutos(""); 
    setPreco(""); 
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
      <button type="submit">Salvar</button> 
    </form> 
  ); 
} 
  
export default ServicoForm;