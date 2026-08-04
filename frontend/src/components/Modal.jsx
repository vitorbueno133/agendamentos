function Modal({ aberto, titulo, aoFechar, children }) {
  if (!aberto) return null;

  return (
    <div className="modal-fundo" onClick={aoFechar}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        
        {/* Cabeçalho do Modal com Título e Botão de Fechar (X) */}
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center", 
          marginBottom: "20px" 
        }}>
          <h2 style={{ 
            margin: 0, 
            fontSize: "20px", 
            color: "var(--cor-primaria)" 
          }}>
            {titulo}
          </h2>
          
          <button 
            onClick={aoFechar} 
            style={{ 
              background: "transparent", 
              border: "none", 
              fontSize: "20px", 
              fontWeight: "bold", 
              cursor: "pointer", 
              color: "var(--cor-texto-suave)",
              padding: "0 8px"
            }}
            aria-label="Fechar"
          >
            ✕
          </button>
        </div>
        
        {/* Aqui dentro será renderizado o Formulário (Cliente, Profissional ou Serviço) */}
        {children}
        
      </div>
    </div>
  );
}

export default Modal;