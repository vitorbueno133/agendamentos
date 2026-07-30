from flask import Blueprint, jsonify, request
from services.servico_service import ServicoService

servico_bp = Blueprint("servicos", __name__)
service = ServicoService()

@servico_bp.route("/api/servicos", methods=["GET"])
def listar_servicos():
    return jsonify([vars(s) for s in service.listar_servicos()])

@servico_bp.route("/api/servicos", methods=["POST"])
def criar_servico():
    dados = request.get_json()
    try:
        servico = service.adicionar_servico(
            dados["nome"],
            dados["duracao_minutos"],
            dados["preco"],
        )
        return jsonify(vars(servico)), 201
    except (ValueError, KeyError) as erro:
        return jsonify({"erro": str(erro)}), 400

@servico_bp.route("/api/servicos/<int:servico_id>", methods=["PUT"])
def atualizar_servico(servico_id):
    dados = request.get_json()
    try:
        servico = service.atualizar_servico(
            servico_id,
            dados["nome"],
            dados["duracao_minutos"],
            dados["preco"],
        )
        return jsonify(vars(servico)), 200
    except (ValueError, KeyError) as erro:
        return jsonify({"erro": str(erro)}), 400

@servico_bp.route("/api/servicos/<int:servico_id>", methods=["DELETE"])
def remover_servico(servico_id):
    try:
        service.remover_servico(servico_id)
        return '', 204
    except ValueError as erro:
        return jsonify({"erro": str(erro)}), 400