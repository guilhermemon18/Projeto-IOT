from flask import Flask, jsonify, request
from flask_cors import CORS

from src.database import RoomDAO, RoomAlreadyExistsError, DatabaseConnectionManager
from src.testemqtt import get_umidadeTemperaturaAtual

app = Flask(__name__)
CORS(app)



# Rota para obter os dados de temperatura e umidade
@app.route('/dados', methods=['GET'])
def obter_dados():

    umidade, temperatura = get_umidadeTemperaturaAtual('sala1')


    # Criar um dicionário com os dados
    dados = {
        'temperature': temperatura,
        'humidity': umidade
    }

    # Retornar os dados como resposta em formato JSON
    return jsonify(dados)


@app.route('/cadastro-sala', methods=['POST'])
def cadastrar_sala():
    dao = RoomDAO()
    dados = request.get_json()
    nome_sala = dados['nomeSala']
    localizacao = dados['localizacao']
    mensagem = 'Sala cadastrada com sucesso'
    try:
        dao.insert_room(nome_sala, localizacao)
    except RoomAlreadyExistsError as e:
        print(f"Error creating room: {str(e)}")
        mensagem = str(e)
    # Retorne uma resposta para o React
    return jsonify({'mensagem': mensagem})

# Rota para obter os nomes das salas
@app.route('/salas', methods=['GET'])
def obter_salas():
    dao = RoomDAO()
    salas = dao.get_all_room_names()
    # Criar um dicionário com os dados
    dados = {
        'salas': salas,
    }
    return jsonify(salas)


# Rota para obter os dados de temperatura e umidade
@app.route('/dadosgrafico', methods=['GET'])
def obter_dados_grafico():
    # Código para obter os dados dos sensores
    temperatura = [25.5, 26.0, 25.8, 26.2]  # Exemplo de array de temperatura
    umidade = [60.2, 61.0, 59.8, 60.5]  # Exemplo de array de umidade

    # Criar um dicionário com os dados
    dados = {
        'temperatura': temperatura,
        'umidade': umidade
    }

    # Retornar os dados como resposta em formato JSON
    return jsonify(dados)

if __name__ == '__main__':
    app.run(debug=True)

