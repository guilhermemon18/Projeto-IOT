import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from 'utils/requests';


interface EditarSalaModalProps {
  sala: Sala;
  onSalvaEdicao: () => void;
  onClose: () => void;
}

const EditarSalaModal: React.FC<EditarSalaModalProps> = ({
  sala,
  onSalvaEdicao,
  onClose,
}) => {
  const [nomeEditado, setNomeEditado] = useState(sala.nome);
  const [localizacaoEditada, setLocalizacaoEditada] = useState(sala.localizacao);

  const handleSalvarEdicao = async () => {
    const salaEditada: Sala = {
      nome: nomeEditado,
      localizacao: localizacaoEditada,
    };

    try {
      await axios.put(`${BASE_URL}/salas/${sala.nome}`, salaEditada);
      onSalvaEdicao();
    } catch (error) {
      console.error('Error updating sala:', error);
    }
  };

  return (
    <div
      className="modal fade"
      id="modalEditarSala"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="modalEditarSalaLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="modalEditarSalaLabel">
              Editar Sala
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Fechar"
              onClick={onClose}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="nomeEditado">Nome:</label>
              <input
                type="text"
                className="form-control"
                id="nomeEditado"
                value={nomeEditado}
                onChange={(e) => setNomeEditado(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="localizacaoEditada">Localização:</label>
              <input
                type="text"
                className="form-control"
                id="localizacaoEditada"
                value={localizacaoEditada}
                onChange={(e) => setLocalizacaoEditada(e.target.value)}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSalvarEdicao}
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarSalaModal;
