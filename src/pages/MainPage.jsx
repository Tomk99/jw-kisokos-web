import React from "react";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";

const MainPage = () => {

    const navigate = useNavigate();

    return (
        <div>
            <h1>JW Kisokos</h1>
            <button onClick={() => navigate("/cards")}>Karbantartási kártyák</button>
        </div>
    );
};

export default MainPage;
