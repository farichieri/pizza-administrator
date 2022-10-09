import React from 'react';
import { useState } from 'react';
import DateRangePicker from '../dateRangePicket/DateRangePicker';
import './reports.scss';
import Graphic from './reportsTypes/graphic/Graphic';

const Reports = () => {
  const [showReport, setShowReport] = useState(<Graphic />);

  const reportSelected = (value) => {
    if (value === 'Graphic') {
      setShowReport(<Graphic />);
    } else {
      setShowReport('');
    }
  };

  const handleFilterReport = (e) => {
    reportSelected(e.target.value);
  };

  return (
    <div className='reports-container'>
      <DateRangePicker />
      <p>Estado:</p>
      <select onChange={handleFilterReport}>
        <option value='Graphic'>Gráfico XD</option>
        <option value='pending'>En preparación</option>
        <option value='done'>Entregadas</option>
      </select>
      {/* <Graphic /> */}
      {showReport}
    </div>
  );
};

export default Reports;
