import sqlite3
import datetime
import time
import threading

from src.testemqtt import get_umidadeTemperaturaAtual


class RoomAlreadyExistsError(Exception):
    pass


class RoomNotFoundError(Exception):
    pass


# Factory para criar a conexão com o banco de dados
class DatabaseConnectionFactory:
    @staticmethod
    def create_connection():
        conn = sqlite3.connect('database.db')
        return conn


# Singleton para gerenciar a conexão com o banco de dados
class DatabaseConnectionManager:
    _instance = threading.local()

    @staticmethod
    def get_instance():
        if not hasattr(DatabaseConnectionManager._instance, 'connection'):
            DatabaseConnectionManager._instance.connection = DatabaseConnectionFactory.create_connection()
        return DatabaseConnectionManager._instance.connection


# DAO para acessar o banco de dados e realizar operações relacionadas às salas e medidas
class RoomDAO:
    def __init__(self):
        self.connection = DatabaseConnectionManager.get_instance()
        self.create_tables()

    def create_tables(self):
        query_rooms = '''CREATE TABLE IF NOT EXISTS rooms (
                            name TEXT PRIMARY KEY,
                            location TEXT
                        )'''
        self.connection.execute(query_rooms)

        query_measures = '''CREATE TABLE IF NOT EXISTS measures (
                                id INTEGER PRIMARY KEY AUTOINCREMENT,
                                room_name TEXT,
                                temperature REAL,
                                humidity REAL,
                                datetime TEXT,
                                FOREIGN KEY (room_name) REFERENCES rooms(name)
                            )'''
        self.connection.execute(query_measures)

    def insert_room(self, name, location):
        query = "INSERT INTO rooms (name, location) VALUES (?, ?)"
        cursor = self.connection.cursor()
        try:
            cursor.execute(query, (name, location))
            self.connection.commit()
        except sqlite3.IntegrityError:
            raise RoomAlreadyExistsError(f"A room with name '{name}' already exists.")

    def delete_room(self, name):
        query = "DELETE FROM rooms WHERE name = ?"
        cursor = self.connection.cursor()
        cursor.execute(query, (name,))
        if cursor.rowcount == 0:
            raise RoomNotFoundError(f"Room '{name}' not found")
        self.connection.commit()

    def get_all_rooms(self):
        query = "SELECT * FROM rooms"
        cursor = self.connection.execute(query)
        return cursor.fetchall()

    def get_all_room_names(self):
        query = "SELECT name FROM rooms"
        cursor = self.connection.execute(query)
        room_names = [row[0] for row in cursor.fetchall()]
        return room_names

    def insert_measure(self, room_name, temperature, humidity, datetime):
        query = "INSERT INTO measures (room_name, temperature, humidity, datetime) VALUES (?, ?, ?, ?)"
        self.connection.execute(query, (room_name, temperature, humidity, datetime))
        self.connection.commit()

    def get_temperature_and_humidity(self, room_name):
        # Obter a hora atual
        current_datetime = datetime.datetime.now()

        # Subtrair 24 horas da hora atual
        start_datetime = current_datetime - datetime.timedelta(hours=24)

        # Converter as datas para strings no formato SQL
        start_datetime_str = start_datetime.strftime('%Y-%m-%d %H:%M:%S')
        current_datetime_str = current_datetime.strftime('%Y-%m-%d %H:%M:%S')

        query = '''SELECT temperature, humidity
                   FROM measures
                   WHERE room_name = ? AND datetime BETWEEN ? AND ?'''
        cursor = self.connection.execute(query, (room_name, start_datetime_str, current_datetime_str))
        return cursor.fetchall()


# Função para coletar dados e inserir medidas para uma sala específica
def collect_data_and_insert_measure(room_name):
    room_dao = RoomDAO()

    while True:
        try:
            # Obter os valores de umidade e temperatura atual para a sala
            valor_umidade, valor_temperatura = get_umidadeTemperaturaAtual(room_name)

            # Obter a data e hora atual
            current_datetime = datetime.datetime.now()
            current_datetime_str = current_datetime.strftime('%Y-%m-%d %H:%M:%S')

            # Inserir os valores de umidade e temperatura na tabela measures
            room_dao.insert_measure(room_name, valor_temperatura, valor_umidade, current_datetime_str)

            # Aguardar 60 segundos antes de obter as medidas novamente
            time.sleep(60)

        except Exception as e:
            print(f"Error collecting data for room '{room_name}': {e}")


# Exemplo de uso
def run():
    # Criar as tabelas e inserir dados de exemplo
    room_dao = RoomDAO()

    # room_dao.insert_room("Sala 1", "Localização 1")

    # Iniciar threads para coletar dados e inserir medidas para cada sala
    threads = []

    while True:
        room_names = room_dao.get_all_room_names()

        # Remover threads antigas que não estão mais ativas
        threads = [thread for thread in threads if thread.is_alive()]

        # Criar threads para novas salas ou atualizar threads existentes
        for room_name in room_names:
            # Verificar se já existe uma thread para essa sala
            existing_thread = next((thread for thread in threads if thread.name == room_name), None)

            if existing_thread:
                # Atualizar a thread existente com o novo nome da sala
                existing_thread.name = room_name
            else:
                # Criar uma nova thread para a sala
                thread = threading.Thread(target=collect_data_and_insert_measure, args=(room_name,), name=room_name)
                thread.start()
                threads.append(thread)

        # Aguardar antes de atualizar novamente
        time.sleep(60)

    # Encerrar a conexão com o banco de dados
    connection = DatabaseConnectionManager.get_instance()
    connection.close()


if __name__ == '__main__':
    run()
