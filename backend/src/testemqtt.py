import threading

import paho.mqtt.client as mqtt


broker_address = "192.168.1.223"
broker_port = 1883
client = mqtt.Client()
lock = threading.Lock()  # Objeto de bloqueio para sincronização

def on_message(client, userdata, msg):
    #print("Nova mensagem recebida no tópico '{msg.topic}': {msg.payload}")
    global ultima_mensagem
    ultima_mensagem = msg.payload.decode()

def dadosMQTT(topico):
    global ultima_mensagem
    global ultima_mensagem
    ultima_mensagem = None
    client.on_message = on_message
    client.connect(broker_address, broker_port, 60)
    client.subscribe(topico, qos=0) 
    
    client.loop_start()

    while ultima_mensagem is None:
        pass  # Aguarda até que a última mensagem seja recebida

    client.loop_stop()
    client.disconnect()

    return ultima_mensagem

def get_umidadeTemperaturaAtual(nomeSala="sala1"):
    with lock:
        dados_string = dadosMQTT("dispositivo/" + nomeSala)
        # Encontre o índice do caractere ":" para separar a string
        indice_umidade = dados_string.index(":")
        indice_temperatura = dados_string.index(", Temperatura:")

        # Extraia os valores de umidade e temperatura com base nos índices encontrados
        valor_umidade = float(dados_string[indice_umidade + 1:indice_temperatura].strip())
        valor_temperatura = float(dados_string[indice_temperatura + 14:].strip())
        return valor_umidade, valor_temperatura


if __name__ == '__main__':
    for i in range(10):
        dados = dadosMQTT("dispositivo/sala1")
        print(dados)

