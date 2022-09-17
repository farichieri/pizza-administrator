import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployees } from '../../../redux/actions';
import Loader from '../../../static/Loader/Loader';
import NoData from '../../../static/NoData/NoData';
import './actualEmployees.scss';

const ActualEmployees = () => {
  const employees = useSelector((state) => state.employees);
  const [isLoading, setIsloading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEmployees()).then(setIsloading);
  }, []);

  return (
    <div className='actualEmployees-container'>
      <tr className='actualEmployees-header'>
        <th>Nombre</th>
        <th>Usuario</th>
        <th>Admin</th>
      </tr>
      {employees ? (
        employees.map((employee) => (
          <tr>
            <th>{employee.name}</th>
            <th>{employee.username}</th>
            <th>{employee.isAdmin ? 'SI' : 'NO'}</th>
          </tr>
        ))
      ) : isLoading ? (
        <Loader />
      ) : (
        <NoData />
      )}
    </div>
  );
};

export default ActualEmployees;
