function AgendaList({ agendamentos, aoCancelar }) { 
  return ( 
    <table> 
      <thead> 
        <tr> 
          <th>Data/Hora</th> 
          <th>Cliente</th> 
          <th>Profissional</th> 
          <th>Servico</th> 
          <th>Status</th> 
          <th>Acoes</th> 
        </tr> 
      </thead> 
      <tbody> 
        {agendamentos.map((agendamento) => ( 
          <tr key={agendamento.id}> 
            <td>{agendamento.data_hora}</td> 
            <td>{agendamento.cliente}</td> 
            <td>{agendamento.profissional}</td> 
            <td>{agendamento.servico}</td> 
            <td>{agendamento.status}</td> 
            <td> 
              {agendamento.status === "confirmado" && 
( 
                <button onClick={() => aoCancelar(agendamento.id)}>Cancelar</button>
                 )} 
            </td> 
          </tr> 
        ))} 
      </tbody> 
    </table> 
  ); 
} 
  
export default AgendaList;