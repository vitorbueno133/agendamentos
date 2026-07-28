import { useState } from "react";
import { User, Phone, Mail, UserPlus } from "lucide-react";

function ClienteForm({ aoSalvar }) {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    aoSalvar({
      nome,
      telefone,
      email,
    });

    setNome("");
    setTelefone("");
    setEmail("");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-6">
      <div className="w-full max-w-lg">

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8">

          <div className="flex flex-col items-center mb-8">

            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center shadow-xl mb-4">
              <UserPlus size={38} className="text-white" />
            </div>

            <h1 className="text-3xl font-bold text-white">
              Novo Cliente
            </h1>

            <p className="text-gray-300 mt-2">
              Cadastre um novo cliente no sistema.
            </p>

          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            <div>
              <label className="text-gray-200 text-sm mb-2 block">
                Nome
              </label>

              <div className="relative">

                <User
                  className="absolute left-4 top-3.5 text-gray-400"
                  size={20}
                />

                <input
                  type="text"
                  placeholder="Digite o nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/15 text-white placeholder-gray-300 border border-white/20 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/30 outline-none transition-all"
                />

              </div>
            </div>

            <div>
              <label className="text-gray-200 text-sm mb-2 block">
                Telefone
              </label>

              <div className="relative">

                <Phone
                  className="absolute left-4 top-3.5 text-gray-400"
                  size={20}
                />

                <input
                  type="text"
                  placeholder="(11) 99999-9999"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/15 text-white placeholder-gray-300 border border-white/20 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/30 outline-none transition-all"
                />

              </div>
            </div>

            <div>
              <label className="text-gray-200 text-sm mb-2 block">
                E-mail
              </label>

              <div className="relative">

                <Mail
                  className="absolute left-4 top-3.5 text-gray-400"
                  size={20}
                />

                <input
                  type="email"
                  placeholder="email@exemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/15 text-white placeholder-gray-300 border border-white/20 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/30 outline-none transition-all"
                />

              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-lg shadow-xl transition duration-300 hover:scale-[1.02] active:scale-95"
            >
              Salvar Cliente
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default ClienteForm;