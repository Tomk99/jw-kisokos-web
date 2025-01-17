import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CardList from "./pages/CardList";
import CreateCard from "./pages/CreateCard";
import MainPage from "./pages/MainPage";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/cards" element={<CardList />} />
          <Route path="/cards/create" element={<CreateCard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
