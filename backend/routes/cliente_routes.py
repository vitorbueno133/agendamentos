from flask import Blueprint, jsonify, request 
from services.cliente_service import ClienteService

cliente_bp = Blueprint("clientes", __name__) 
service = ClienteService() 

@cliente_bp.route("/api/clientes", methods=["GET"]) 
def listar_clientes(): 
    clientes = service.listar_clientes() 
    return jsonify([vars(c) for c in clientes])
  
@cliente_bp.route("/api/clientes", methods=["POST"]) 
def criar_cliente(): 
    dados = request.get_json() 
    try: 
        cliente = service.adicionar_cliente( 
            dados["nome"], dados.get("telefone"), dados["email"] 
        ) 
        return jsonify(vars(cliente)), 201 
    except (ValueError, KeyError) as erro: 
        return jsonify({"erro": str(erro)}), 400

@cliente_bp.route("/api/clientes/<int:cliente_id>", methods=["PUT"])
def atualizar_cliente(cliente_id):
    dados = request.get_json()
    try:
        cliente = service.atualizar_cliente(
            cliente_id, dados["nome"], dados.get("telefone"), dados["email"]
        )
        return jsonify(vars(cliente)), 200
    except (ValueError, KeyError) as erro:
        return jsonify({"erro": str(erro)}), 400

@cliente_bp.route("/api/clientes/<int:cliente_id>", methods=["DELETE"])
def remover_cliente(cliente_id):
    try:
        service.remover_cliente(cliente_id)
        return '', 204
    except ValueError as erro:
        return jsonify({"erro": str(erro)}), 400