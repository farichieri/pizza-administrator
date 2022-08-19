import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    console.log('userToken', userToken);

    return userToken;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    localStorage.setItem('token', JSON.stringify(userToken));
    console.log('userToken', userToken);
    setToken(userToken);
  };

  console.log('token', token);

  return {
    setToken: saveToken,
    token,
  };
}
