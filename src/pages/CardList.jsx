import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllCards, deleteCard } from '../services/api';
import { ClipLoader } from 'react-spinners';  // Töltő karika importálása
import Card from '../components/Card'; // A Card komponens importálása
import './CardList.css';

const CardList = () => {
    const navigate = useNavigate();
    const [cards, setCards] = useState([]);
    const [pdfPreviewId, setPdfPreviewId] = useState(null);
    const [imagePreviewId, setImagePreviewId] = useState(null);
    const [loading, setLoading] = useState(true); // Töltési állapot

    // API hívás a kártyák lekérésére
    useEffect(() => {
        getAllCards()
            .then((response) => {
                setCards(response.data);
                setLoading(false); // Töltés befejezése
            })
            .catch((error) => {
                console.error('Error fetching cards:', error);
                setLoading(false); // Hibás hívás esetén is befejezzük a töltést
            });
    }, []);

    const handlePdfPreview = (cardId) => {
        setPdfPreviewId(pdfPreviewId === cardId ? null : cardId);
    };

    const handleImagePreview = (cardId) => {
        setImagePreviewId(imagePreviewId === cardId ? null : cardId);
    };

    const handleDelete = (id) => {
        deleteCard(id)
            .then(() => setCards(cards.filter((card) => card.id !== id)))
            .catch((error) => console.error('Error deleting card:', error));
    };

    return (
        <div className="card-list-container">
            <button className="btn-back" onClick={() => navigate("/")}>Vissza</button>
            <h1>Karbantartási kártyák</h1>
            <button onClick={() => navigate("/cards/create")}>Kártya hozzáadása</button>
            
            {/* Töltő karika megjelenítése, amíg a kártyák töltődnek */}
            {loading ? (
                <div className="loader-container">
                    <ClipLoader size={50} color="#FF9800" loading={loading} />
                </div>
            ) : (
                <ul>
                    {cards.map((card) => (
                        <Card
                            key={card.id}
                            card={card}
                            pdfPreviewId={pdfPreviewId}
                            imagePreviewId={imagePreviewId}
                            handlePdfPreview={handlePdfPreview}
                            handleImagePreview={handleImagePreview}
                            handleDelete={handleDelete}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CardList;
