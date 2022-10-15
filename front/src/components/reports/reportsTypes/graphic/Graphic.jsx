import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { formatMoney } from '../../../../hooks/formatMoney';
import './graphic.scss';

const Graphic = ({ reportData, rangeDate }) => {
  const getDateArray = (start, end) => {
    let arr = new Array();
    let dt = new Date(start);
    while (dt <= end) {
      arr.push(new Date(dt));
      dt.setDate(dt.getDate() + 1);
    }
    return arr;
  };

  const argDate = (date) => {
    return new Date(
      new Date(date).setHours(new Date(date).getHours() - 3)
    ).toISOString();
  };

  const testingDateArray = getDateArray(
    new Date(rangeDate.startDate),
    new Date(rangeDate.endDate)
  );

  const newData = testingDateArray.map((day) => {
    return {
      date: new Date(day).toISOString().slice(0, 10),
      Facturado: reportData.reduce((acc, next) => {
        if (
          new Date(day).toISOString().slice(0, 10) ===
          argDate(next.startDate).slice(0, 10)
        )
          return acc + next.orderTotalValue;
        else return acc;
      }, 0),
    };
  });

  return (
    <div className='graphic-container'>
      <ResponsiveContainer height='95%' width='100%'>
        <AreaChart
          data={newData}
          margin={{
            top: 10,
            right: 35,
            left: 30,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='date' />
          <YAxis tickFormatter={(value) => formatMoney(value)} />
          <Tooltip formatter={(value) => formatMoney(value)} />
          <Area
            type='monotone'
            dataKey='Facturado'
            stroke='#8884d8'
            fill='#8884d8'
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Graphic;
