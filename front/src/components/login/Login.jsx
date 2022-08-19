import React, { useState } from 'react';
import './login.scss';
import PropTypes from 'prop-types';

const Login = ({ setToken }) => {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

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
