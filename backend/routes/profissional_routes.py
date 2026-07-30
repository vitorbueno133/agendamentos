from flask import Blueprint, jsonify, request 
from services.profissional_service import ProfissionalService 
  
profissional_bp = Blueprint("profissionais", __name__) 
service = ProfissionalService() 
  
@profissional_bp.route("/api/profissionais", methods=["GET"]) 
def listar_profissionais(): 
    return jsonify([vars(p) for p in service.listar_profissionais()]) 
  
@profissional_bp.route("/api/profissionais", methods=["POST"]) 
def criar_profissional(): 
    dados = request.get_json() 
    try: 
        profissional = service.adicionar_profissional( 
            dados["nome"], dados.get("especialidade") 
        ) 
        return jsonify(vars(profissional)), 201 
    except (ValueError, KeyError) as erro: 
        return jsonify({"erro": str(erro)}), 400

@profissional_bp.route("/api/profissionais/<int:profissional_id>", methods=["PUT"])
def atualizar_profissional(profissional_id):
    dados = request.get_json()
    try:
        profissional = service.atualizar_profissional(
            profissional_id, dados["nome"], dados.get("especialidade")
        )
        return jsonify(vars(profissional)), 200
    except (ValueError, KeyError) as erro:
        return jsonify({"erro": str(erro)}), 400

@profissional_bp.route("/api/profissionais/<int:profissional_id>", methods=["DELETE"])
def remover_profissional(profissional_id):
    try:
        service.remover_profissional(profissional_id)
        return '', 204
    except ValueError as erro:
        return jsonify({"erro": str(erro)}), 400