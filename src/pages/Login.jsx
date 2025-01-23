import React from 'react';

const Login = () => {
  const handleLogin = () => {
    window.location.href = 'https://jw-kisokos-aa53f6432494.herokuapp.com/oauth2/authorization/google';
  };

  return (
    <button onClick={handleLogin}>
      Bejelentkezés Google-lal
    </button>
  );
};

export default Login;
