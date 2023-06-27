# Criar as tabelas e inserir dados de exemplo
from src.database import RoomDAO

room_dao = RoomDAO()

# room_dao.insert_room("Sala 1", "Localização 1")

    # Inserir uma medida de temperatura e umidade
    #room_dao.insert_measure("Sala 1", 25.5, 60.2, "2023-06-25 12:00:00")

    # Buscar apenas temperaturas e umidades das últimas 24 horas em relação à hora atual
    # room_name = "Sala 1"  # Nome da sala desejada
temperature_and_humidity = room_dao.get_temperature_and_humidity("sala1")
print("Medidas de temperatura e umidade das últimas 24 horas:")
for measure in temperature_and_humidity:
    temperature = measure[0]
    humidity = measure[1]
    print(f"Temperatura: {temperature}, Umidade: {humidity}")