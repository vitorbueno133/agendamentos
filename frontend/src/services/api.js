const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"; 
  
export async function buscarStatus() { 
  const resposta = await 
fetch(`${BASE_URL}/api/status`); 
  return resposta.json(); 
} 
  
export async function listarClientes() { 
  const resposta = await 
fetch(`${BASE_URL}/api/clientes`); 
  return resposta.json(); 
} 
  
export async function criarCliente(cliente) {
  const resposta = await fetch(`${BASE_URL}/api/clientes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cliente),
  });

  if (!resposta.ok) {
    const texto = await resposta.text();
    console.log(texto);
    throw new Error("Erro ao criar cliente.");
  }

  return await resposta.json();
}