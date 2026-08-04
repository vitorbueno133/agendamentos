function ConfirmDialog({ aberto, mensagem, aoConfirmar, aoCancelar, carregando }) { 
  if (!aberto) return null; 
  
  return ( 
    <div className="modal-fundo" onClick={aoCancelar}> 
      <div 
        className="modal-card" 
        role="dialog" 
        aria-modal="true" 
        onClick={(e) => e.stopPropagation()} 
      > 
        <p className="modal-mensagem">{mensagem}</p> 
        <div className="modal-acoes"> 
          <button 
            className="botao-confirmar" 
            onClick={aoConfirmar}
            disabled={carregando}
          > 
            {carregando ? "Aguarde..." : "OK"}
          </button> 
          <button className="botao-secundario" onClick={aoCancelar}> 
            Cancelar 
          </button> 
        </div> 
      </div> 
    </div> 
  ); 
} 
  
export default ConfirmDialog;