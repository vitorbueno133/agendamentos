function ServicoList({ servicos }) { 
  return ( 
    <table> 
      <thead> 
        <tr> 
          <th>Nome</th> 
          <th>Duração</th> 
          <th>Preço</th> 
        </tr> 
      </thead> 
      <tbody> 
        {servicos.map((servico) => ( 
          <tr key={servico.id}> 
            <td>{servico.nome}</td> 
            <td>{servico.duracao_minutos} min</td> 
            <td>R$ {servico.preco}</td> 
          </tr> 
        ))} 
      </tbody> 
    </table> 
  ); 
} 
  
export default ServicoList;