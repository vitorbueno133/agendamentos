import { useState } from "react";

function ClienteForm({ aoSalvar }) {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");

  function handleSubmit(evento) {
    evento.preventDefault();

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
    <div className="card">
      <h2>Novo Cliente</h2>
      <p className="subtitulo">
        Preencha os dados abaixo para cadastrar um novo cliente.
      </p>

      <form className="form-grid" onSubmit={handleSubmit}>
        <div className="campo">
          <label>Nome</label>
          <input
            type="text"
            placeholder="Digite o nome completo"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        <div className="campo">
          <label>Telefone</label>
          <input
            type="text"
            placeholder="(11) 99999-9999"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />
        </div>

        <div className="campo campo-inteiro">
          <label>E-mail</label>
          <input
            type="email"
            placeholder="cliente@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="acoes">
          <button type="submit">
            Salvar Cliente
          </button>
        </div>
      </form>
    </div>
  );
}

export default ClienteForm;