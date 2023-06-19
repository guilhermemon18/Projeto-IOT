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
                        <li className="nav-item" onClick={toggleNav}>
                            <Link to="/dataset" className="nav-link">
                                Dashboard
                            </Link>
                        </li>
                        <li className="nav-item" onClick={toggleNav}>
                            <Link to="/alunos" className="nav-link">
                                Alunos
                            </Link>
                        </li>
                      
                        <li className="nav-item">
                            <Link to="/relatorios" className="nav-link" onClick={toggleNav}>
                                Relatórios
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );


}

export default Navbar;