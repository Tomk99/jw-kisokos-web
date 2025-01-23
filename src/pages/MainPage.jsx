import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import './MainPage.css';

const MainPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Felhasználói adatok lekérése a backendről
    api.get('/api/user')
      .then(response => setUser(response.data))
      .catch(error => console.error('Hiba a felhasználói adatok lekérésekor:', error));
  }, []);

  return (
    <div className="main-container">
      <header className="main-header">
        <h1>JW Kisokos</h1>
        {user && (
          <div className="user-info">
            <img src={user.picture} alt="Profilkép" className="profile-image" />
            <div>
              <p className="user-name">{user.name}</p>
              <p className="user-email">{user.email}</p>
            </div>
          </div>
        )}
      </header>
      <div className="button-container">
        <button onClick={() => navigate("/cards")}>Karbantartási kártyák</button>
      </div>
    </div>
  );
};

export default MainPage;
