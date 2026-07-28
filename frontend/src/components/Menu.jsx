function Menu({ telaAtiva, aoTrocarTela }) {
  const telas = [
    { chave: "agenda", rotulo: "Agenda" },
    { chave: "clientes", rotulo: "Clientes" },
    { chave: "profissionais", rotulo: "Profissionais" },
    { chave: "servicos", rotulo: "Serviços" },
  ];

  return (
    <header className="menu">
      <div className="menu-logo">
        <div className="logo">A</div>

        <div>
          <h2>Agendamentos SaaS</h2>
          <span>Painel Administrativo</span>
        </div>
      </div>

      <nav className="menu-nav">
        {telas.map((tela) => (
          <button
            key={tela.chave}
            className={`menu-btn ${
              telaAtiva === tela.chave ? "ativo" : ""
            }`}
            onClick={() => aoTrocarTela(tela.chave)}
          >
            {tela.rotulo}
          </button>
        ))}
      </nav>
    </header>
  );
}

export default Menu;