import React, { useEffect, useState } from 'react';
import './index.css'
import GraficoLinha from 'components/GraficoLinha';
import { BASE_URL } from 'utils/requests';
import axios from 'axios';
import Navbar from 'components/NavBar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Graficos from 'pages/Graficos';
import CadastroSala from 'pages/CadastroSala';
import SalasList from 'pages/SalasList';

const App: React.FC = () => {
  
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
        <Route path="/" element={<Graficos />} />
        <Route path="/cadastrarsala" element={<CadastroSala />} />
        <Route path="/listarsalas" element={<SalasList />} />
      </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;