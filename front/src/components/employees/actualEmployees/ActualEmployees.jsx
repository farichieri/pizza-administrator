import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getEmployees } from '../../../redux/actions';
import Loader from '../../../static/Loader/Loader';
import NoData from '../../../static/NoData/NoData';
import './actualEmployees.scss';
import '../../../layout/button/button.scss';

const ActualEmployees = () => {
  const employees = useSelector((state) => state.employees);
  const [isLoading, setIsloading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEmployees()).then(setIsloading);
  }, []);

  const handleDelete = (event) => {
    event.preventDefault();
    if (
      window.confirm(
        `Estas seguro de eliminar al usuario ${event.target.value}?`
      )
    ) {
      dispatch(deleteUser(event.target.id)).then((responseMessage) => {
        if (responseMessage) dispatch(getEmployees());
        alert(responseMessage);
      });
    }
  };

  return (
    <div className='actualEmployees-container'>
      <tr className='actualEmployees-header'>
        <th>Nombre</th>
        <th>Usuario</th>
        <th>Admin</th>
        <th>Eliminar</th>
      </tr>
      {employees.length ? (
        employees.map((employee) => (
          <tr key={employee.username}>
            <th>{employee.name}</th>
            <th>{employee.username}</th>
            <th>{employee.isAdmin ? 'SI' : 'NO'}</th>
            <th>
              {!employee.isSuperAdmin && (
                <button
                  onClick={handleDelete}
                  id={employee._id}
                  value={employee.username}
                  className='delete-employee'
                >
                  x
                </button>
              )}
            </th>
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
