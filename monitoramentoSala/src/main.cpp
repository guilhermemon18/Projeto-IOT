#include <Arduino.h>
#include <AM2320.h>
#include <Wire.h>
#include <PubSubClient.h>
#include <WiFi.h>
#include <string>
#include <Adafruit_Sensor.h>

//Define a o Wi-fi e a Senha que o esp ira se conectar
//mudar para o wifi da minha casa!
#define SSIDRASP "TCC-Gabriel"
#define PASS "tccGabriel"

// #define SSIDRASP "Wifi"
// #define PASS "12345678"


//Define o IP e a porta do Broker para o MQTT
#define RASP_BROKER_IP "192.168.0.102"
#define PORTA 1883

//nome topico publicacao
#define TOPICO  "dispositivo/sala1"

WiFiClient wifiClient;
PubSubClient mqttClient(RASP_BROKER_IP, PORTA, wifiClient);
AM2320 sensor;


void wifiConnect() {
  if (WiFi.status() == WL_CONNECTED) {
    return;
  }
  WiFi.begin(SSIDRASP, PASS);
  Serial.println("Conectando à rede WiFi");
  if (WiFi.waitForConnectResult() != WL_CONNECTED) {
    Serial.println("Não conectado ao WiFi");
    delay(2000);
    ESP.restart();
  }
  Serial.println("");
  Serial.println("Conectado à rede WiFi");
  WiFi.mode(WIFI_STA);
}


void mqtt(String mensagem) {
  if (mqttClient.connect(TOPICO)) {
    Serial.println("Conectado ao broker MQTT");
  } else {
    Serial.println("Falha ao conectar ao broker MQTT");
  }

  if (mqttClient.connected()) {
      mqttClient.publish(TOPICO, mensagem.c_str());
  }
}

void setup() {
  Serial.begin(115200);
  wifiConnect();
  Wire.begin();
  sensor.begin();
}

void loop() {
  String mensagem;
  if (sensor.measure()) {
    Serial.print("Temperature: ");
    Serial.println(sensor.getTemperature());
    Serial.print("Humidity: ");
    Serial.println(sensor.getHumidity());
    mensagem = "Umidade: " + String(sensor.getHumidity()) + ", " + "Temperatura: " + String(sensor.getTemperature());
    //dá para alterar amsg para obter melhor os dados!
    
  } else {
    // Caso haja um erro na leitura do sensor
    Serial.println("Erro ao ler dados do sensor AM2320");
  }
  mqtt(mensagem);
  delay(2000); 
}