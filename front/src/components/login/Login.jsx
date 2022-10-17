import React, { useState } from 'react';
import './login.scss';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/actions';

const Login = ({ setToken }) => {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (username && password) {
      await dispatch(loginUser(username, password)).then((loginData) => {
        console.log(loginData);
        if (loginData.user) {
          dispatch({ type: 'LOGIN', payload: loginData });
          localStorage.setItem('user', JSON.stringify(loginData));
          setToken(loginData.user);
          alert(`Bienvenido ${username}!`);
        } else {
          alert('Usuario o contraseña inválidos');
        }
      });
    } else {
      alert('Por favor escriba su usuario y contraseña');
    }
  };

  return (
    <div className='login'>
      <h1>Please, Login:</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Usuario'
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type='password'
          placeholder='Contraseña'
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type='submit'>Enter</button>
      </form>
    </div>
  );
};

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Login;
