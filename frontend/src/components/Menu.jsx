import {
  Users,
  Briefcase,
  Scissors,
} from "lucide-react";

function Menu({ telaAtiva, aoTrocarTela }) {
  const telas = [
    {
      chave: "clientes",
      rotulo: "Clientes",
      icone: <Users size={20} />,
    },
    {
      chave: "profissionais",
      rotulo: "Profissionais",
      icone: <Briefcase size={20} />,
    },
    {
      chave: "servicos",
      rotulo: "Serviços",
      icone: <Scissors size={20} />,
    },
  ];

  return (
    <header className="w-full bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 shadow-xl sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">

        <h1 className="text-3xl font-bold text-white tracking-wide">
          Agendamentos SaaS
        </h1>

        <nav className="flex gap-4">

          {telas.map((tela) => (
            <button
              key={tela.chave}
              onClick={() => aoTrocarTela(tela.chave)}
              className={`
                flex items-center gap-2
                px-5 py-3
                rounded-xl
                font-semibold
                transition-all
                duration-300
                ${
                  telaAtiva === tela.chave
                    ? "bg-cyan-500 text-white shadow-lg scale-105"
                    : "bg-white/10 text-gray-200 hover:bg-white/20 hover:text-white"
                }
              `}
            >
              {tela.icone}
              {tela.rotulo}
            </button>
          ))}

        </nav>

      </div>

    </header>
  );
}

export default Menu;