import { useEffect, useState } from "react"; 
import { buscarFaturamento, urlExportacaoCsv } from 
"../services/api"; 
  
const moeda = new Intl.NumberFormat("pt-BR", { 
  style: "currency", 
  currency: "BRL", 
}); 
  
function RelatorioFaturamento() { 
  const [linhas, setLinhas] = useState([]); 
  
  function carregar() { 
    buscarFaturamento().then(setLinhas); 
  } 
  
  useEffect(() => { 
    carregar(); 
  }, []); 
  
  const totalFaturamento = linhas.reduce((soma, l) => 
soma + l.faturamento, 0); 
  const totalAtendimentos = linhas.reduce((soma, l) => 
soma + l.atendimentos, 0); 
  
  if (linhas.length === 0) { 
    return <p>Nenhum atendimento concluido ainda.</p>; 
  } 
   return ( 
    <div> 
      <div className="cards-resumo"> 
        <div className="card">
            <span>Faturamento total</span> 
          
<strong>{moeda.format(totalFaturamento)}</strong> 
        </div> 
        <div className="card"> 
          <span>Atendimentos concluidos</span> 
          <strong>{totalAtendimentos}</strong> 
        </div> 
      </div> 
  
      <table> 
        <thead> 
          <tr> 
            <th>Profissional</th> 
            <th>Atendimentos</th> 
            <th>Faturamento</th> 
          </tr> 
        </thead> 
        <tbody> 
          {linhas.map((linha) => ( 
            <tr key={linha.profissional}> 
              <td>{linha.profissional}</td> 
              <td>{linha.atendimentos}</td> 
              
<td>{moeda.format(linha.faturamento)}</td> 
            </tr> 
          ))} 
        </tbody> 
      </table> 
  
      <a className="botao" 
href={urlExportacaoCsv()}>Baixar CSV</a> 
      <button onClick={carregar}>Atualizar</button> 
    </div> 
  ); 
} 
  
export default RelatorioFaturamento;