import React from 'react';
import { useEffect } from 'react';
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

  const [reportSelected, setReportSelected] = useState('Graphic');

  const [showReport, setShowReport] = useState(
    <Graphic reportData={reportData} rangeDate={rangeDate} />
  );

  useEffect(() => {
    switch (reportSelected) {
      case 'Graphic':
        setShowReport(
          <Graphic reportData={reportData} rangeDate={rangeDate} />
        );
        break;
    }
  }, [rangeDate, reportSelected, reportData]);

  const handleFilterReport = (e) => {
    setReportSelected(e.target.value);
  };

  return (
    <div className='reports-container'>
      <div className='reports-container-header'>
        <DateRangePicker rangeDate={rangeDate} setRangeDate={setRangeDate} />
        <p>Estado:</p>
        <select onChange={handleFilterReport}>
          <option value='Graphic'>Facturación</option>
          {/* <option value='pending'>En preparación</option> */}
          {/* <option value='done'>Entregadas</option> */}
        </select>
      </div>
      {showReport}
    </div>
  );
};

export default Reports;
