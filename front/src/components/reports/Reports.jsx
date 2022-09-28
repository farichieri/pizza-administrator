import React from 'react';
import './reports.scss';
import Graphic from './reportsTypes/graphic/Graphic';

const Reports = () => {
  const handleFilterReport = () => {};
  return (
    <div className='reports-container'>
      <p>Estado:</p>
      <select onChange={handleFilterReport}>
        <option value='all-orders'>Gráfico XD</option>
        <option value='pending'>En preparación</option>
        <option value='done'>Entregadas</option>
      </select>
      <Graphic />
    </div>
  );
};

export default Reports;
