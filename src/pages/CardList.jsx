import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllCards, deleteCard } from '../services/api';
import './CardList.css';

const CardList = () => {
    const navigate = useNavigate();
    const [cards, setCards] = useState([]);
    const [pdfPreviewId, setPdfPreviewId] = useState(null);
    const [imagePreviewId, setImagePreviewId] = useState(null);

    // API hívás a kártyák lekérésére
    useEffect(() => {
        getAllCards()
            .then((response) => setCards(response.data))
            .catch((error) => console.error('Error fetching cards:', error));
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
        <div>
            <button className="btn-back" onClick={() => navigate("/")}>Vissza</button>
            <h1>Karbantartási kártyák</h1>
            <button onClick={() => navigate("/cards/create")}>Kártya hozzáadása</button>
            <ul>
                {cards.map((card) => (
                    <li key={card.id}>
                        <div>
                            <strong>{card.name} ({card.period})</strong>
                        </div>
                        <div>
                            <strong>Utoljára elvégzett:</strong> {card.lastPerformed}
                        </div>
                        <div>
                            <strong>Tartalom:</strong>
                            {card.fileData && card.fileType === "image/jpeg" && (
                                <div>
                                    <button onClick={() => handleImagePreview(card.id)} className="button-style">
                                        {imagePreviewId === card.id ? "Elrejtés" : "Megtekintés"}
                                    </button>
                                    <button onClick={() => handleDelete(card.id)} className="delete-button-style">
                                        Törlés
                                    </button>
                                    {imagePreviewId === card.id && (
                                        <img
                                            src={`data:${card.fileType};base64,${card.fileData}`}
                                            alt="Card Attachment"
                                        />
                                    )}
                                </div>
                            )}

                            {card.fileData && card.fileType === "application/pdf" && (
                                <div>
                                    <button onClick={() => handlePdfPreview(card.id)} className="button-style">
                                        {pdfPreviewId === card.id ? "Elrejtés" : "Megtekintés"}
                                    </button>
                                    <button onClick={() => handleDelete(card.id)} className="delete-button-style">
                                        Törlés
                                    </button>
                                    {pdfPreviewId === card.id && (
                                        <iframe
                                            src={`data:${card.fileType};base64,${card.fileData}`}
                                            width="100%"
                                            height="400px"
                                            title={`PDF Preview - ${card.name}`}
                                        ></iframe>
                                    )}
                                </div>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CardList;
