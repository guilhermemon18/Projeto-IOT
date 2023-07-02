import React, { useState } from 'react';
import { BASE_URL } from 'utils/requests';

const CadastroSala: React.FC = () => {
  const [nomeSala, setNomeSala] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleNomeSalaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNomeSala(event.target.value);
  };

  const handleLocalizacaoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalizacao(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(BASE_URL + '/cadastro-sala', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nomeSala,
          localizacao,
        }),
      });

      const data = await response.json();
      window.location.reload();
      setMensagem(data.mensagem);
    } catch (error) {
      console.error('Erro ao cadastrar sala:', error);
    }

    setNomeSala('');
    setLocalizacao('');
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-body">
              <h2 className="card-title text-center">Cadastro de Sala</h2>
              {mensagem && <p className="text-center">{mensagem}</p>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="nomeSala" className="form-label">
                    Nome da Sala:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nomeSala"
                    value={nomeSala}
                    onChange={handleNomeSalaChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="localizacao" className="form-label">
                    Localização:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="localizacao"
                    value={localizacao}
                    onChange={handleLocalizacaoChange}
                  />
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary">
                    Cadastrar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CadastroSala;
