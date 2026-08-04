function Menu({ telaAtiva, aoTrocarTela, aoSair }) { 
  const telas = [ 
    { chave: "agenda", rotulo: "Agenda" }, 
    { chave: "clientes", rotulo: "Clientes" }, 
    { chave: "profissionais", rotulo: "Profissionais"}, 
    { chave: "servicos", rotulo: "Serviços" }, 
    { chave: "relatorios", rotulo: "Relatórios" }, 
  ]; 
  
  return ( 
    <nav style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}> 
      <div style={{ display: "flex", gap: "8px", flex: 1, flexWrap: "wrap" }}>
        {telas.map((tela) => ( 
          <button 
            key={tela.chave} 
            onClick={() => aoTrocarTela(tela.chave)} 
            style={{ fontWeight: telaAtiva === tela.chave ? "bold" : "normal" }} 
          > 
            {tela.rotulo} 
          </button> 
        ))} 
      </div>
      <button 
        className="botao-sair" 
        onClick={aoSair} 
        style={{ marginLeft: "auto" }}
      >
        Sair
      </button>
    </nav> 
  ); 
} 
  
export default Menu;