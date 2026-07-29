import csv 
import io
from flask import Blueprint, jsonify, Response 
from services.agendamento_service import AgendamentoService
from routes.auth_routes import token_obrigatorio
  
relatorio_bp = Blueprint("relatorios", __name__) 
service = AgendamentoService() 
  
  
@relatorio_bp.route("/api/relatorios/faturamento", 
methods=["GET"])
@token_obrigatorio
def faturamento(): 
    return jsonify(service.relatorio_faturamento()) 
  
  
@relatorio_bp.route("/api/relatorios/faturamento/csv", 
methods=["GET"]) 
def faturamento_csv(): 
    dados = service.relatorio_faturamento() 
    saida = io.StringIO() 
    escritor = csv.writer(saida) 
    escritor.writerow(["Profissional", "Atendimentos", 
"Faturamento"]) 
    for linha in dados: 
        escritor.writerow([linha["profissional"], 
linha["atendimentos"], linha["faturamento"]]) 
  
    return Response( 
        saida.getvalue(), 
        mimetype="text/csv", 
        headers={"Content-Disposition": "attachment; filename=faturamento.csv"}, 
    )