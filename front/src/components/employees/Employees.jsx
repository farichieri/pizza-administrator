import React from 'react';
import ActualEmployees from './actualEmployees/ActualEmployees';
import CreateEmployee from './createEmployee/CreateEmployee';
import './employees.scss';

const Employees = () => {
  return (
    <div className='employees-container'>
      <CreateEmployee />
      <ActualEmployees />
    </div>
  );
};

export default Employees;
