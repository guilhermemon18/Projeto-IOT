import React, { useState } from 'react';
import './index.css'
import Navbar from 'components/NavBar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Graficos from 'pages/Graficos';
import CadastroSala from 'pages/CadastroSala';
import SalasList from 'pages/SalasList';

const App: React.FC = () => {

  
  const [salaName, setSalaName] = useState('sala1');

  
  const handleSalaChange = (newSala: string) => {
    console.log("atualizou a sala para: " + newSala)
    setSalaName(newSala);
}
  
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar onChangeSala={handleSalaChange} />
        <Routes>
        <Route path="/" element={<Graficos salaName={salaName} />} />
        <Route path="/cadastrarsala" element={<CadastroSala />} />
        <Route path="/listarsalas" element={<SalasList />} />
      </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;