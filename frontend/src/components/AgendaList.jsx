function AgendaList({ agendamentos }) { 
  return ( 
    <table> 
      <thead> 
        <tr> 
          <th>Data/Hora</th> 
          <th>Cliente</th> 
          <th>Profissional</th> 
        <th>Serviço</th>
         <th>Status</th> 
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
          </tr> 
        ))} 
      </tbody> 
    </table> 
  ); 
} 
  
export default AgendaList; 