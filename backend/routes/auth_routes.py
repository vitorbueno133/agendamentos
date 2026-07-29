from functools import wraps 
  
import jwt 
from flask import Blueprint, jsonify, request

from services.auth_service import AuthService 
  
auth_bp = Blueprint("auth", __name__) 
service = AuthService() 
  
  
@auth_bp.route("/api/login", methods=["POST"]) 
def login(): 
    dados = request.get_json() 
    try: 
        token = service.login(dados["email"], dados["senha"]) 
        return jsonify({"token": token}) 
    except (ValueError, KeyError) as erro: 
        return jsonify({"erro": str(erro)}), 401 
  
  
def token_obrigatorio(funcao): 
    @wraps(funcao) 
    def decorada(*args, **kwargs): 
        cabecalho = request.headers.get("Authorization", "") 
        token = cabecalho.replace("Bearer ", "") 
        try: 
            service.validar_token(token) 
        except jwt.InvalidTokenError: 
            return jsonify({"erro": "Token ausente ou invalido."}), 401 
        return funcao(*args, **kwargs) 
    return decorada