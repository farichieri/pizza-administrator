import React from 'react';
import { useState } from 'react';
import { getEmployees, postEmployee } from '../../../redux/actions';
import { useDispatch } from 'react-redux';
import './createEmployee.scss';

const CreateEmployee = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    name: '',
    username: '',
    password: '',
    isAdmin: false,
  });

  const handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const createEmployee = (event) => {
    event.preventDefault();
    dispatch(postEmployee(input)).then((response) => {
      if (response) dispatch(getEmployees());
    });
  };

  return (
    <div className='createEmployee-container'>
      <h1>Crear nuevo empleado:</h1>
      <form onSubmit={createEmployee}>
        <input
          name='name'
          autoComplete='off'
          value={input.name}
          onChange={handleChange}
          type='text'
          placeholder='Nombre'
        />
        <input
          name='username'
          autoComplete='off'
          value={input.username}
          onChange={handleChange}
          type='text'
          placeholder='Usuario'
        />
        <input
          name='password'
          autoComplete='off'
          value={input.password}
          onChange={handleChange}
          type='text'
          placeholder='Contraseña'
        />
        <div className='isAdmin'>
          <p>Check si será admin:</p>
          <input
            name='isAdmin'
            value={input.isAdmin}
            checked={input.isAdmin}
            onChange={handleChange}
            type='checkbox'
          />
        </div>
        <button className='create'>Crear</button>
      </form>
    </div>
  );
};

export default CreateEmployee;
