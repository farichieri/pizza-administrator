import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getOrdersBetweenDates } from '../../redux/actions';
import './dateRangePicker.scss';

const DateRangePicker = ({ rangeDate, setRangeDate }) => {
  const dispatch = useDispatch();

  // const [date, setDate] = useState({
  //   startDate: rangeDate.dateNowMinusSevenDays,
  //   endDate: rangeDate.dateNow,
  // });

  const handleChange = (event) => {
    event.preventDefault();
    if (event.target.name === 'start') {
      setRangeDate({
        ...rangeDate,
        startDate: event.target.value,
      });
    } else if (event.target.name === 'end') {
      setRangeDate({
        ...rangeDate,
        endDate: event.target.value,
      });
    }
  };

  useEffect(() => {
    dispatch(
      getOrdersBetweenDates(
        new Date(rangeDate.startDate).toISOString(),
        new Date(rangeDate.endDate).toISOString()
      )
    );
  }, [rangeDate.endDate, rangeDate.startDate]);

  return (
    <div className='dateRangePicker-container'>
      <div>
        <p>Desde</p>
        <input
          onChange={handleChange}
          type='date'
          id='start'
          name='start'
          value={rangeDate.startDate}
        />
      </div>
      <div>
        <p>Hasta</p>
        <input
          onChange={handleChange}
          type='date'
          id='end'
          name='end'
          value={rangeDate.endDate}
        />
      </div>
    </div>
  );
};

export default DateRangePicker;
