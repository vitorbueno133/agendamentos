import { useEffect, useState } from "react";
import {
  buscarFaturamento,
  urlExportacaoCsv,
  urlExportacaoExcel,
} from "../services/api";

const moeda = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

// Primeiro dia do mês atual (AAAA-MM-DD)
function inicioDoMes() {
  const hoje = new Date();

  return `${hoje.getFullYear()}-${String(
    hoje.getMonth() + 1
  ).padStart(2, "0")}-01`;
}

// Data de hoje (AAAA-MM-DD)
function hoje() {
  const d = new Date();
  const mes = String(d.getMonth() + 1).padStart(2, "0");
  const dia = String(d.getDate()).padStart(2, "0");

  return `${d.getFullYear()}-${mes}-${dia}`;
}

function RelatorioFaturamento() {
  const [linhas, setLinhas] = useState([]);
  const [inicio, setInicio] = useState(inicioDoMes());
  const [fim, setFim] = useState(hoje());
  const [carregando, setCarregando] = useState(false);

  function carregar() {
    setCarregando(true);

    buscarFaturamento(inicio, fim)
      .then(setLinhas)
      .finally(() => setCarregando(false));
  }

  useEffect(() => {
    carregar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inicio, fim]);

  function verTudo() {
    setInicio("");
    setFim("");
  }

  function esteMes() {
    setInicio(inicioDoMes());
    setFim(hoje());
  }

  const totalFaturamento = linhas.reduce(
    (soma, l) => soma + l.faturamento,
    0
  );

  const totalAtendimentos = linhas.reduce(
    (soma, l) => soma + l.atendimentos,
    0
  );

  const ticketMedio =
    totalAtendimentos > 0
      ? totalFaturamento / totalAtendimentos
      : 0;

  return (
    <div>
      <div className="filtros-relatorio">
        <label>
          De
          <input
            type="date"
            value={inicio}
            onChange={(e) => setInicio(e.target.value)}
          />
        </label>

        <label>
          Até
          <input
            type="date"
            value={fim}
            onChange={(e) => setFim(e.target.value)}
          />
        </label>

        <button onClick={esteMes}>
          Este mês
        </button>

        <button onClick={verTudo}>
          Todo o período
        </button>
      </div>

      {carregando && (
        <p>Carregando relatório...</p>
      )}

      {!carregando && linhas.length === 0 ? (
        <p>
          Nenhum atendimento concluído no período
          selecionado.
        </p>
      ) : (
        !carregando && (
          <>
            <div className="cards-resumo">
              <div className="card">
                <span>Faturamento total</span>
                <strong>
                  {moeda.format(totalFaturamento)}
                </strong>
              </div>

              <div className="card">
                <span>Atendimentos concluídos</span>
                <strong>{totalAtendimentos}</strong>
              </div>

              <div className="card">
                <span>Ticket médio</span>
                <strong>
                  {moeda.format(ticketMedio)}
                </strong>
              </div>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Profissional</th>
                  <th>Atendimentos</th>
                  <th>Faturamento</th>
                </tr>
              </thead>

              <tbody>
                {linhas.map((linha) => (
                  <tr
                    key={
                      linha.profissional_id ??
                      linha.profissional
                    }
                  >
                    <td>{linha.profissional}</td>
                    <td>{linha.atendimentos}</td>
                    <td>
                      {moeda.format(
                        linha.faturamento
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <a
              className="botao"
              href={urlExportacaoExcel(
                inicio,
                fim
              )}
            >
              Baixar Excel
            </a>

            <a
              className="botao-secundario"
              href={urlExportacaoCsv(
                inicio,
                fim
              )}
            >
              Baixar CSV
            </a>

            <button onClick={carregar}>
              Atualizar
            </button>
          </>
        )
      )}
    </div>
  );
}

export default RelatorioFaturamento;