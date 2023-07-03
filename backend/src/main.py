import threading

from flask import Flask, jsonify, request
from flask_cors import CORS

from src.database import RoomDAO, RoomAlreadyExistsError, DatabaseConnectionManager, run, RoomNotFoundError
from src.testemqtt import get_umidadeTemperaturaAtual

app = Flask(__name__)
CORS(app)


# Rota para obter os dados de temperatura e umidade
@app.route('/dados', methods=['GET'])
def obter_dados():
    sala = request.args.get('sala')
    print(sala)
    # umidade, temperatura = get_umidadeTemperaturaAtual('sala1')
    try:
        umidade, temperatura = get_umidadeTemperaturaAtual(sala)

        # umidade, temperatura = 85, 40
        # Criar um dicionário com os dados
        dados = {
            'temperature': temperatura,
            'humidity': umidade
        }

        # Retornar os dados como resposta em formato JSON
        return jsonify(dados)
    except Exception as e:
        print(str(e))
        # Se ocorrer uma exceção, retornar uma resposta de erro
        mensagem_erro = str(e)
        resposta = {
            'error': mensagem_erro
        }
        return jsonify(resposta), 400  # Código de status 400 indica uma requisição inválida ou erro do cliente


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


@app.route('/salas/<nome>', methods=['DELETE'])
def excluir_sala(nome):
    dao = RoomDAO()
    try:
        dao.delete_room(nome)
        return jsonify({'mensagem': f'Sala {nome} excluída com sucesso'})
    except RoomNotFoundError:
        return jsonify({'mensagem': f'Sala {nome} não encontrada'}), 404
    except Exception as e:
        return jsonify({'mensagem': f'Erro ao excluir sala: {str(e)}'}), 500

# Rota para obter os nomes das salas
@app.route('/nomes-salas', methods=['GET'])
def obter_nomes_salas():
    dao = RoomDAO()
    salas = dao.get_all_room_names()
    # Criar um dicionário com os dados
    dados = {
        'salas': salas,
    }
    return jsonify(salas)


# Rota para obter os nomes das salas
@app.route('/salas', methods=['GET'])
def obter_salas():
    dao = RoomDAO()
    rows = dao.get_all_rooms()
    salas = []

    for row in rows:
        name = row[0]
        location = row[1]
        salas.append({"nome": name, "localizacao": location})
    print(salas)
    return jsonify(salas)


# Rota para obter os dados de temperatura e umidade
@app.route('/dadosgrafico', methods=['GET'])
def obter_dados_grafico():
    # Código para obter os dados dos sensores
    temperatura = [25.5, 26.0, 25.8, 26.2]  # Exemplo de array de temperatura
    umidade = [60.2, 61.0, 59.8, 60.5]  # Exemplo de array de umidade
    dao = RoomDAO()
    dados = dao.get_temperature_and_humidity("sala1")

    # Criar listas vazias para armazenar as temperaturas e umidades
    temperatures = []
    humidities = []

    # Percorrer os resultados da consulta e separar as temperaturas e umidades
    for result in dados:
        temperatures.append(result[0])
        humidities.append(result[1])
    #
    temperatura = temperatures
    umidade = humidities

    print(dados)
    print(temperatura)
    print(umidade)
    # Criar um dicionário com os dados
    dados = {
        'temperatura': temperatura,
        'umidade': umidade
    }

    # Retornar os dados como resposta em formato JSON
    return jsonify(dados)


if __name__ == '__main__':
    # Criar uma instância da classe Thread, passando a função main como alvo
    thread = threading.Thread(target=run)

    # Iniciar a execução da thread
    thread.start()

    app.run(debug=True)
