import GraficoLinha from 'components/GraficoLinha';
import React from 'react';

function Graficos() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div className="chart">
            {/* Conteúdo do gráfico */}
            <GraficoLinha />
          </div>
        </div>
        <div className="col-md-6">
          <div className="row">
            <div className="col">
              <div className="chart">
                {/* Conteúdo do gráfico */}
                <GraficoLinha />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="chart">
                {/* Conteúdo do gráfico */}
                <GraficoLinha />
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Graficos;
