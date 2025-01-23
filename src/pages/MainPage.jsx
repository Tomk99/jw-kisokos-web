import React from "react";
import { useNavigate } from "react-router-dom";
import './MainPage.css';

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <div className="main-container">
      <h1>JW Kisokos</h1>
      <div className="button-container">
        <button onClick={() => navigate("/cards")}>Karbantartási kártyák</button>
      </div>
    </div>
  );
};

export default MainPage;
