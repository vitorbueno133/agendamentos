function ProfissionalList({ profissionais, aoEditar, aoExcluir }) { 
  return ( 
    <table> 
      <thead> 
        <tr> 
          <th>Nome</th> 
          <th>Especialidade</th>
          <th>Ações</th> 
        </tr> 
      </thead> 
      <tbody> 
        {profissionais.map((profissional) => ( 
          <tr key={profissional.id}> 
            <td>{profissional.nome}</td> 
            <td>{profissional.especialidade}</td>
            <td className="acoes-agendamento">
              <button className="botao-concluir" onClick={() => aoEditar(profissional)}>Editar</button>
              <button className="botao-cancelar" onClick={() => aoExcluir(profissional)}>Excluir</button>
            </td> 
          </tr> 
        ))} 
      </tbody> 
    </table> 
  ); 
} 
  
export default ProfissionalList;