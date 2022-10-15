import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getOrdersBetweenDates } from '../../redux/actions';
import './dateRangePicker.scss';

const DateRangePicker = ({ rangeDate, setRangeDate }) => {
  const dispatch = useDispatch();

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

  const arStartDate = new Date(
    new Date(rangeDate.startDate).setHours(
      new Date(rangeDate.startDate).getHours() + 3
    )
  ).toISOString();
  const arEndDate = new Date(
    new Date(rangeDate.endDate).setUTCHours(20, 59, 59, 999)
  ).toISOString();

  useEffect(() => {
    dispatch(getOrdersBetweenDates(arStartDate, arEndDate));
    localStorage.setItem(
      'between-dates',
      JSON.stringify({ startDate: arStartDate, endDate: arEndDate })
    );
  }, [rangeDate.endDate, rangeDate.startDate]);

  return (
    <div className='dateRangePicker-container'>
      <div>
        <p>Desde:</p>
        <input
          onChange={handleChange}
          type='date'
          id='start'
          min='2022-10-01'
          name='start'
          value={rangeDate.startDate}
        />
      </div>
      <div>
        <p>Hasta:</p>
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
