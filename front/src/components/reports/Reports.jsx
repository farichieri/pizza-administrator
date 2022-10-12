import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import DateRangePicker from '../dateRangePicker/DateRangePicker';
import './reports.scss';
import Graphic from './reportsTypes/graphic/Graphic';

const Reports = () => {
  const reportData = useSelector((state) => state.report);
  const dateNow = new Date().toISOString().slice(0, 10);
  const dateNowMinusSevenDays = new Date(new Date() - 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 10);

  const [rangeDate, setRangeDate] = useState({
    startDate: dateNowMinusSevenDays,
    endDate: dateNow,
  });

  console.log(rangeDate);

  const [showReport, setShowReport] = useState(
    <Graphic reportData={reportData} rangeDate={rangeDate} />
  );

  const reportSelected = (value) => {
    if (value === 'Graphic') {
      setShowReport(<Graphic reportData={reportData} rangeDate={rangeDate} />);
    } else {
      setShowReport('');
    }
  };

  const handleFilterReport = (e) => {
    reportSelected(e.target.value);
  };

  return (
    <div className='reports-container'>
      <DateRangePicker rangeDate={rangeDate} setRangeDate={setRangeDate} />
      <p>Estado:</p>
      <select onChange={handleFilterReport}>
        <option value='Graphic'>Gráfico XD</option>
        <option value='pending'>En preparación</option>
        <option value='done'>Entregadas</option>
      </select>
      {showReport}
    </div>
  );
};

export default Reports;
