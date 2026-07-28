function ClienteList({ clientes }) {
  return (
    <div className="card">
      <div className="table-header">
        <div>
          <h2>Clientes Cadastrados</h2>
          <p className="subtitulo">
            Total de clientes: <strong>{clientes.length}</strong>
          </p>
        </div>
      </div>

      <div className="table-responsive">
        <table className="tabela">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Telefone</th>
              <th>E-mail</th>
            </tr>
          </thead>

          <tbody>
            {clientes.length === 0 ? (
              <tr>
                <td colSpan="3" className="sem-registros">
                  Nenhum cliente cadastrado.
                </td>
              </tr>
            ) : (
              clientes.map((cliente) => (
                <tr key={cliente.id}>
                  <td>{cliente.nome}</td>
                  <td>{cliente.telefone}</td>
                  <td>{cliente.email}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ClienteList;