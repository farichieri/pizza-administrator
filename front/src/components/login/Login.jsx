import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/actions';
import './login.scss';
import PropTypes from 'prop-types';

const Login = ({ setToken }) => {
  const dispatch = useDispatch();
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   dispatch(login({ username, password }));
  // };

  async function loginUser(event) {
    event.preventDefault();
    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (data.user) {
      setToken(data.user);
      alert('Login successful');
    } else {
      alert('Please check your username and password');
    }
    console.log(data);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password,
    });
    setToken(token);
  };

  return (
    <div className='login'>
      <h1>Please, Login:</h1>
      <form onSubmit={loginUser}>
        <input type='text' onChange={(e) => setUserName(e.target.value)} />
        <input type='password' onChange={(e) => setPassword(e.target.value)} />
        <button type='submit'>Enter</button>
      </form>
    </div>
  );
};

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Login;
