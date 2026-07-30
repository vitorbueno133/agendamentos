import { useEffect } from "react"; 

function Toast({ mensagem, tipo = "sucesso", aoFechar 
}) { 
  useEffect(() => { 
    if (!mensagem) return; 
    const tempo = setTimeout(aoFechar, 3000); 
    return () => clearTimeout(tempo); 
  }, [mensagem, aoFechar]); 
  
  if (!mensagem) return null; 
  
  return ( 
    <div className={`toast toast-${tipo}`} 
role="status"> 
      {mensagem} 
    </div> 
  ); 
} 
  
export default Toast;