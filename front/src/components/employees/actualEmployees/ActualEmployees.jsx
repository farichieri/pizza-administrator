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
    console.log(event.target.id);
    if (window.confirm('¿Seguro que queres borrarlo bro?')) {
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
      {employees ? (
        employees.map((employee) => (
          <tr>
            <th>{employee.name}</th>
            <th>{employee.username}</th>
            <th>{employee.isAdmin ? 'SI' : 'NO'}</th>
            <th>
              <button
                onClick={handleDelete}
                id={employee._id}
                className='delete-employee'
              >
                x
              </button>
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
