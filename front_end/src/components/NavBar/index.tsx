import './styles.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL } from 'utils/requests';

function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [activeSala, setActiveSala] = useState('');
  const [salaOptions, setSalaOptions] = useState<string[]>([]);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  useEffect(() => {
    fetchSalasFromAPI();
  }, []);

  const fetchSalasFromAPI = async () => {
    try {
      const response = await fetch(BASE_URL + '/salas');
      const data = await response.json();
      setSalaOptions(data);
      setActiveSala(data[0]);
    } catch (error) {
      console.log('Erro ao obter as salas:', error);
    }
  };

  const handleSelectSala = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    setActiveSala(event.currentTarget.textContent || '');
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link to="/" className="navbar-brand">
          Monitoramento Ambiente Salas IOT
        </Link>
        <button className="navbar-toggler" type="button" onClick={toggleNav}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isNavOpen ? 'show' : ''}`}>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link" onClick={toggleNav}>
                Home
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
                href="#"
                role="button"
                aria-expanded="false"
              >
                {activeSala || 'Não há salas cadastradas'}
              </a>
              <ul className="dropdown-menu">
                {salaOptions.map((sala) => (
                  <li key={sala}>
                    <a
                      className="dropdown-item"
                     
                      onClick={handleSelectSala}
                    >
                      {sala}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
            <li className="nav-item" onClick={toggleNav}>
              <Link to="/cadastrarsala" className="nav-link">
                Cadastrar Nova Sala
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
