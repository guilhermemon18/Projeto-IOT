import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from 'utils/requests';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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


  const handleExcluirSala = async (nome: string) => {
    try {
      const response = await axios.delete(`${BASE_URL}/salas/${nome}`);
      setSalas(salas.filter((sala) => sala.nome !== nome));
      const mensagem = response.data.mensagem;
      toast.success(mensagem);  // Exibir notificação de sucesso
    } catch (error) {
      console.error('Error deleting sala:', error);
      if (axios.isAxiosError(error) && error.response && error.response.data) {
        const mensagemErro = error.response.data.mensagem;
        toast.error(mensagemErro);  // Exibir mensagem de erro do backend
      } else {
        toast.error('Error deleting sala');  // Exibir notificação de erro genérica
      }
    }
  };

  return (
    <div>
      <ToastContainer />
      <h1 className='text-center'>Lista de Salas</h1>
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
