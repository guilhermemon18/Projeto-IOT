from flask import Flask, jsonify
from flask_cors import CORS

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

