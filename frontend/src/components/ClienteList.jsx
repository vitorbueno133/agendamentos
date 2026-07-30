function ClienteList({ clientes, aoEditar, aoExcluir }) { 
  return ( 
    <table> 
      <thead> 
        <tr> 
          <th>Nome</th> 
          <th>Telefone</th> 
          <th>E-mail</th> 
          <th>Ações</th>
        </tr> 
      </thead> 
      <tbody> 
        {clientes.map((cliente) => ( 
          <tr key={cliente.id}> 
            <td>{cliente.nome}</td> 
            <td>{cliente.telefone}</td> 
            <td>{cliente.email}</td> 
            <td className="acoes-agendamento">
              <button className="botao-concluir" onClick={() => aoEditar(cliente)}>Editar</button>
              <button className="botao-cancelar" onClick={() => aoExcluir(cliente)}>Excluir</button>
            </td>
          </tr> 
        ))} 
      </tbody> 
    </table> 
  ); 
} 
  
export default ClienteList;