import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from 'utils/requests';

interface Sala {
  nome: string;
  localizacao: string;
}

const SalasList: React.FC = () => {
  const [salas, setSalas] = useState<Sala[]>([]);

  useEffect(() => {
    const fetchSalas = async () => {
      try {
        const response = await axios.get<Sala[]>(BASE_URL + '/salas');
        setSalas(response.data);
        console.log("SalasList: " + response.data)
      } catch (error) {
        console.error('Error fetching salas:', error);
      }
    };

    fetchSalas();
  }, []);

  const handleEditarSala = (nome: string) => {
    // Lógica para editar a sala com o ID fornecido
  };

  const handleExcluirSala = async (nome: string) => {
    try {
      await axios.delete(`URL_DO_BACKEND/api/salas/${nome}`);
      setSalas(salas.filter((sala) => sala.nome !== nome));
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
            <tr key={sala.nome}>
              <td>{sala.nome}</td>
              <td>{sala.localizacao}</td>
              <td>
                <button
                  className="btn btn-primary mr-2"
                  onClick={() => handleEditarSala(sala.nome)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleExcluirSala(sala.nome)}
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
