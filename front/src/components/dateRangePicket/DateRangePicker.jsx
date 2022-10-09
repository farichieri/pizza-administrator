import React from 'react';
import { useState } from 'react';
import './dateRangePicker.scss';

const DateRangePicker = () => {
  const [startDate, setStartDate] = useState(Date.now());
  const [endDate, setEndDate] = useState(Date.now());
  console.log(startDate);

  return (
    <div className='dateRangePicker-container'>
      <div>
        <p>Desde</p>
        <input
          type='date'
          id='start'
          name='trip-start'
          value='2018-07-22'
          min='2018-01-01'
          max='2018-12-31'
        />
      </div>
      <div>
        <p>Hasta</p>
        <input
          type='date'
          id='start'
          name='trip-start'
          value='2018-07-22'
          min='2018-01-01'
          max='2018-12-31'
        />
      </div>
    </div>
  );
};

export default DateRangePicker;
