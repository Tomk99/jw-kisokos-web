import React from "react";

const Login = () => {
  const handleLogin = () => {
    window.location.href = "https://jw-kisokos-aa53f6432494.herokuapp.com/oauth2/authorization/google";
  };

  return (
    <div className="login-page">
      <h1>Bejelentkezés</h1>
      <button onClick={handleLogin} className="login-button">
        Bejelentkezés Google-lal
      </button>
    </div>
  );
};

export default Login;
