import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Sala {
  id: number;
  nome: string;
  localizacao: string;
}

const SalasList: React.FC = () => {
  const [salas, setSalas] = useState<Sala[]>([]);

  useEffect(() => {
    const fetchSalas = async () => {
      try {
        const response = await axios.get<Sala[]>('URL_DO_BACKEND/api/salas');
        setSalas(response.data);
      } catch (error) {
        console.error('Error fetching salas:', error);
      }
    };

    fetchSalas();
  }, []);

  const handleEditarSala = (id: number) => {
    // Lógica para editar a sala com o ID fornecido
  };

  const handleExcluirSala = async (id: number) => {
    try {
      await axios.delete(`URL_DO_BACKEND/api/salas/${id}`);
      setSalas(salas.filter((sala) => sala.id !== id));
    } catch (error) {
      console.error('Error deleting sala:', error);
    }
  };

  return (
    <div>
      <h1>Lista de Salas</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Localização</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {salas.map((sala) => (
            <tr key={sala.id}>
              <td>{sala.nome}</td>
              <td>{sala.localizacao}</td>
              <td>
                <button
                  className="btn btn-primary mr-2"
                  onClick={() => handleEditarSala(sala.id)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleExcluirSala(sala.id)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalasList;
