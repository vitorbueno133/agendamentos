import { useState, useMemo } from "react";

const POR_PAGINA = 10;

function formatarDataHora(valor) {
  return new Date(valor).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function AgendaList({ agendamentos, aoCancelar, aoConcluir }) {
  const [filtroData, setFiltroData] = useState("");
  const [filtroCliente, setFiltroCliente] = useState("");
  const [filtroProfissional, setFiltroProfissional] = useState("");
  const [pagina, setPagina] = useState(1);

  const filtrados = useMemo(() => {
    return agendamentos.filter((a) => {
      const dataAgend = a.data_hora ? a.data_hora.slice(0, 10) : "";

      if (filtroData && dataAgend !== filtroData) return false;

      if (
        filtroCliente &&
        !a.cliente.toLowerCase().includes(filtroCliente.toLowerCase())
      ) {
        return false;
      }

      if (
        filtroProfissional &&
        !a.profissional
          .toLowerCase()
          .includes(filtroProfissional.toLowerCase())
      ) {
        return false;
      }

      return true;
    });
  }, [agendamentos, filtroData, filtroCliente, filtroProfissional]);

  const total = Math.ceil(filtrados.length / POR_PAGINA);

  const visiveis = filtrados.slice(
    (pagina - 1) * POR_PAGINA,
    pagina * POR_PAGINA
  );

  function aoMudarFiltro(fn) {
    fn();
    setPagina(1);
  }

  return (
    <div>
      <div className="filtros-agenda">
        <input
          type="date"
          value={filtroData}
          onChange={(e) =>
            aoMudarFiltro(() => setFiltroData(e.target.value))
          }
        />

        <input
          type="text"
          placeholder="Buscar cliente..."
          value={filtroCliente}
          onChange={(e) =>
            aoMudarFiltro(() => setFiltroCliente(e.target.value))
          }
        />

        <input
          type="text"
          placeholder="Buscar profissional..."
          value={filtroProfissional}
          onChange={(e) =>
            aoMudarFiltro(() => setFiltroProfissional(e.target.value))
          }
        />

        <button
          onClick={() => {
            setFiltroData("");
            setFiltroCliente("");
            setFiltroProfissional("");
            setPagina(1);
          }}
        >
          Limpar filtros
        </button>
      </div>

      {visiveis.length === 0 ? (
        <p>Nenhum agendamento encontrado para os filtros selecionados.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Data/Hora</th>
              <th>Cliente</th>
              <th>Profissional</th>
              <th>Serviço</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {visiveis.map((agendamento) => (
              <tr key={agendamento.id}>
                <td>{formatarDataHora(agendamento.data_hora)}</td>
                <td>{agendamento.cliente}</td>
                <td>{agendamento.profissional}</td>
                <td>{agendamento.servico}</td>
                <td>{agendamento.status}</td>

                <td className="acoes-agendamento">
                  {agendamento.status === "confirmado" && (
                    <>
                      <button
                        className="botao-concluir"
                        onClick={() => aoConcluir(agendamento.id)}
                      >
                        ✓ Concluir
                      </button>

                      <button
                        className="botao-cancelar"
                        onClick={() => {
                          if (
                            window.confirm(
                              "Cancelar este agendamento?"
                            )
                          ) {
                            aoCancelar(agendamento.id);
                          }
                        }}
                      >
                        ✕ Cancelar
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {total > 1 && (
        <div className="paginacao">
          <button
            onClick={() => setPagina((p) => Math.max(1, p - 1))}
            disabled={pagina === 1}
          >
            Anterior
          </button>

          <span>
            {pagina} / {total}
          </span>

          <button
            onClick={() => setPagina((p) => Math.min(total, p + 1))}
            disabled={pagina === total}
          >
            Próxima
          </button>
        </div>
      )}
    </div>
  );
}

export default AgendaList;