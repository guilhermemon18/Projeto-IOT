import './styles.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';


function Navbar() {

    const [isNavOpen, setIsNavOpen] = useState(false);

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link to="/" className="navbar-brand">
                    Monitoramento Ambiente Salas IOT
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={toggleNav}
                >
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
                            <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Sala Ativa</a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">Sala 1</a></li>
                                <li><a className="dropdown-item" href="#">Sala 2</a></li>
                                <li><a className="dropdown-item" href="#">Sala 3</a></li>
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