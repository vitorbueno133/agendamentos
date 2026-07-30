function ServicoList({ servicos, aoEditar, aoExcluir }) { 
  return ( 
    <table> 
      <thead> 
        <tr> 
          <th>Nome</th> 
          <th>Duração</th> 
          <th>Preço</th> 
          <th>Ações</th>
        </tr> 
      </thead> 
      <tbody> 
        {servicos.map((servico) => ( 
          <tr key={servico.id}> 
            <td>{servico.nome}</td> 
            <td>{servico.duracao_minutos} min</td> 
            <td>R$ {servico.preco}</td>
            <td className="acoes-agendamento">
              <button className="botao-concluir" onClick={() => aoEditar(servico)}>Editar</button>
              <button className="botao-cancelar" onClick={() => aoExcluir(servico)}>Excluir</button>
            </td> 
          </tr> 
        ))} 
      </tbody> 
    </table> 
  ); 
} 
  
export default ServicoList;