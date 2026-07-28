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
  const resposta = await 
fetch(`${BASE_URL}/api/clientes`, { 
    method: "POST", 
    headers: { "Content-Type": "application/json" }, 
    body: JSON.stringify(cliente), 
  }); 
  const dados = await resposta.json(); 
  if (!resposta.ok) { 
    throw new Error(dados.erro || "Erro ao criar cliente."); 
  } 
  return dados; 
} 

export async function listarProfissionais() { 
  const resposta = await 
fetch(`${BASE_URL}/api/profissionais`); 
  return resposta.json(); 
} 
  
export async function criarProfissional(profissional) 
{ 
  const resposta = await 
fetch(`${BASE_URL}/api/profissionais`, { 
    method: "POST", 
    headers: { "Content-Type": "application/json" }, 
    body: JSON.stringify(profissional), 
  }); 
  const dados = await resposta.json(); 
  if (!resposta.ok) { 
    throw new Error(dados.erro || "Erro ao criar profissional."); 
  } 
  return dados; 
} 
  
export async function listarServicos() { 
  const resposta = await 
fetch(`${BASE_URL}/api/servicos`); 
  return resposta.json(); 
} 
  
export async function criarServico(servico) { 
  const resposta = await 
fetch(`${BASE_URL}/api/servicos`, { 
 method: "POST", 
    headers: { "Content-Type": "application/json" }, 
    body: JSON.stringify(servico), 
  }); 
  const dados = await resposta.json(); 
  if (!resposta.ok) { 
    throw new Error(dados.erro || "Erro ao criar serviço."); 
  } 
  return dados; 
}