import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import routes from "./services/routeConfig";
import PrivateRoutes from "./components/PrivateRoutes";
import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => setIsAuthenticated(false);

  return (
    <Router>
      <div className="App-div">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {routes.map(({ path, component: Component, protected: isProtected }) => (
            <Route
              key={path}
              path={path}
              element={
                isProtected ? (
                  <PrivateRoutes isAuthenticated={isAuthenticated}>
                    <Component />
                  </PrivateRoutes>
                ) : (
                  <Component />
                )
              }
            />
          ))}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
