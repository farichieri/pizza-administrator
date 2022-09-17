import React, { PureComponent } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import './reports.scss';

const data = [
  {
    name: 'Lunes',
    uv: 100,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Martes',
    uv: 150,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Miércoles',
    uv: 200,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Jueves',
    uv: 300,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Sábado',
    uv: 250,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Domingo',
    uv: 300,
    pv: 3800,
    amt: 2500,
  },
];

const Reports = () => {
  return (
    <div className='reports-container'>
      <ResponsiveContainer height='95%' width='95%'>
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip />
          <Area type='monotone' dataKey='uv' stroke='#8884d8' fill='#8884d8' />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Reports;
