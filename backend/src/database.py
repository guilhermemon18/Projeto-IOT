import sqlite3
import datetime


# Factory para criar a conexão com o banco de dados
class DatabaseConnectionFactory:
    @staticmethod
    def create_connection():
        conn = sqlite3.connect('database.db')
        return conn


# Singleton para gerenciar a conexão com o banco de dados
class DatabaseConnectionManager:
    _instance = None

    @staticmethod
    def get_instance():
        if not DatabaseConnectionManager._instance:
            DatabaseConnectionManager._instance = DatabaseConnectionFactory.create_connection()
        return DatabaseConnectionManager._instance


# DAO para acessar o banco de dados e realizar operações relacionadas às salas e medidas
class RoomDAO:
    def __init__(self):
        self.connection = DatabaseConnectionManager.get_instance()
        self.create_tables()

    def create_tables(self):
        query_rooms = '''CREATE TABLE IF NOT EXISTS rooms (
                            id INTEGER PRIMARY KEY AUTOINCREMENT,
                            name TEXT,
                            location TEXT
                        )'''
        self.connection.execute(query_rooms)

        query_measures = '''CREATE TABLE IF NOT EXISTS measures (
                                id INTEGER PRIMARY KEY AUTOINCREMENT,
                                room_id INTEGER,
                                temperature REAL,
                                humidity REAL,
                                datetime TEXT,
                                FOREIGN KEY (room_id) REFERENCES rooms(id)
                            )'''
        self.connection.execute(query_measures)

    def insert_room(self, name, location):
        query = "INSERT INTO rooms (name, location) VALUES (?, ?)"
        cursor = self.connection.cursor()
        cursor.execute(query, (name, location))
        self.connection.commit()
        return cursor.lastrowid

    def get_all_rooms(self):
        query = "SELECT * FROM rooms"
        cursor = self.connection.execute(query)
        return cursor.fetchall()

    def insert_measure(self, room_id, temperature, humidity, datetime):
        query = "INSERT INTO measures (room_id, temperature, humidity, datetime) VALUES (?, ?, ?, ?)"
        self.connection.execute(query, (room_id, temperature, humidity, datetime))
        self.connection.commit()

    def get_temperature_and_humidity(self, room_id):
        # Obter a hora atual
        current_datetime = datetime.datetime.now()

        # Subtrair 24 horas da hora atual
        start_datetime = current_datetime - datetime.timedelta(hours=24)

        # Converter as datas para strings no formato SQL
        start_datetime_str = start_datetime.strftime('%Y-%m-%d %H:%M:%S')
        current_datetime_str = current_datetime.strftime('%Y-%m-%d %H:%M:%S')

        query = '''SELECT temperature, humidity
                   FROM measures
                   WHERE room_id = ? AND datetime BETWEEN ? AND ?'''
        cursor = self.connection.execute(query, (room_id, start_datetime_str, current_datetime_str))
        return cursor.fetchall()


# Exemplo de uso
def main():
    # Criar as tabelas e inserir dados de exemplo
    room_dao = RoomDAO()
    room_id = room_dao.insert_room("Sala 1", "Localização 1")

    # Inserir uma medida de temperatura e umidade
    room_dao.insert_measure(room_id, 25.5, 60.2, "2023-06-22 12:00:00")

    # Buscar apenas temperaturas e umidades das últimas 24 horas em relação à hora atual
    #room_id = 1  # ID da sala desejada
    temperature_and_humidity = room_dao.get_temperature_and_humidity(room_id)
    print("Medidas de temperatura e umidade das últimas 24 horas:")
    for measure in temperature_and_humidity:
        temperature = measure[0]
        humidity = measure[1]
        print(f"Temperatura: {temperature}, Umidade: {humidity}")


    # Encerrar a conexão com o banco de dados
    connection = DatabaseConnectionManager.get_instance()
    connection.close()


if __name__ == '__main__':
    main()
