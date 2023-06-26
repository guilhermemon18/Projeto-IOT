import GraficoLinha from 'components/GraficoLinha';
import GraficoSensor from 'components/GraficoSensor';
import React from 'react';

function Graficos() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div className="chart">
            {/* Conteúdo do gráfico */}
            <GraficoSensor />
          </div>
        </div>
        <div className="col-md-6">
          {/* <div className="row"> */}
            <div className="col">
              <div className="chart">
                {/* Conteúdo do gráfico */}
                <GraficoLinha />
              </div>
            </div>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}

export default Graficos;
