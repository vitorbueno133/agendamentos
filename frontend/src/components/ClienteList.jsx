import { Users, User, Phone, Mail } from "lucide-react";

function ClienteList({ clientes }) {
  return (
    <div className="max-w-6xl mx-auto mt-10">

      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden">

        <div className="flex items-center justify-between px-8 py-6 border-b border-white/10 bg-gradient-to-r from-cyan-600 to-blue-700">

          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-xl">
              <Users className="text-white" size={28} />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">
                Clientes
              </h2>

              <p className="text-cyan-100">
                Total de clientes: {clientes.length}
              </p>
            </div>
          </div>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-slate-800 text-white uppercase text-sm">

              <tr>

                <th className="px-6 py-4 text-left">
                  Cliente
                </th>

                <th className="px-6 py-4 text-left">
                  Telefone
                </th>

                <th className="px-6 py-4 text-left">
                  E-mail
                </th>

              </tr>

            </thead>

            <tbody>

              {clientes.length === 0 ? (

                <tr>
                  <td
                    colSpan={3}
                    className="text-center py-10 text-gray-400"
                  >
                    Nenhum cliente cadastrado.
                  </td>
                </tr>

              ) : (

                clientes.map((cliente) => (

                  <tr
                    key={cliente.id}
                    className="border-b border-gray-200 hover:bg-cyan-50 transition duration-300"
                  >

                    <td className="px-6 py-5">

                      <div className="flex items-center gap-4">

                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">

                          <User
                            size={22}
                            className="text-white"
                          />

                        </div>

                        <div>

                          <h3 className="font-semibold text-gray-800">
                            {cliente.nome}
                          </h3>

                          <p className="text-sm text-gray-500">
                            ID #{cliente.id}
                          </p>

                        </div>

                      </div>

                    </td>

                    <td className="px-6 py-5">

                      <div className="flex items-center gap-3 text-gray-700">

                        <Phone
                          size={18}
                          className="text-cyan-600"
                        />

                        {cliente.telefone}

                      </div>

                    </td>

                    <td className="px-6 py-5">

                      <div className="flex items-center gap-3 text-gray-700">

                        <Mail
                          size={18}
                          className="text-blue-600"
                        />

                        {cliente.email}

                      </div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default ClienteList;