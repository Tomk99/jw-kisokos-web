import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllCards, deleteCard } from '../services/api';
import { ClipLoader } from 'react-spinners';
import Card from '../components/Card';
import './CardList.css';

const CardList = () => {
    const navigate = useNavigate();
    const [cards, setCards] = useState([]);
    const [filteredCards, setFilteredCards] = useState([]);
    const [pdfPreviewId, setPdfPreviewId] = useState(null);
    const [imagePreviewId, setImagePreviewId] = useState(null);
    const [loading, setLoading] = useState(true);

    const [searchTerm, setSearchTerm] = useState(''); // Keresési kifejezés
    const [sortKey, setSortKey] = useState(''); // Rendezési kulcs (pl. név vagy dátum)
    const [filterPeriod, setFilterPeriod] = useState(''); // Szűrési periódus

    useEffect(() => {
        getAllCards()
            .then((response) => {
                setCards(response.data);
                setFilteredCards(response.data); // Alapértelmezett lista
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching cards:', error);
                setLoading(false);
            });
    }, []);

    // Szűrés és rendezés alkalmazása
    useEffect(() => {
        let updatedCards = [...cards];

        // Szűrés keresés alapján
        if (searchTerm) {
            updatedCards = updatedCards.filter(card =>
                card.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Szűrés periódus alapján
        if (filterPeriod) {
            updatedCards = updatedCards.filter(card => card.period === filterPeriod);
        }

        // Rendezés
        if (sortKey === 'name') {
            updatedCards.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortKey === 'lastPerformed') {
            updatedCards.sort((a, b) => new Date(a.lastPerformed) - new Date(b.lastPerformed));
        }

        setFilteredCards(updatedCards);
    }, [searchTerm, sortKey, filterPeriod, cards]);

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

            {/* Szűrés és rendezés */}
            <div className="filters">
                <input
                    type="text"
                    placeholder="Keresés név alapján..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select onChange={(e) => setSortKey(e.target.value)}>
                    <option value="">Rendezés</option>
                    <option value="name">Név</option>
                    <option value="lastPerformed">Utoljára elvégzett</option>
                </select>
                <select onChange={(e) => setFilterPeriod(e.target.value)}>
                    <option value="">Szűrés periódus alapján</option>
                    <option value="WEEKLY">HETI</option>
                    <option value="MONTHLY">HAVI</option>
                    <option value="QUARTERLY">NEGYEDÉVES</option>
                    <option value="HALF_YEARLY">FÉLÉVES</option>
                    <option value="YEARLY">ÉVES</option>
                </select>
            </div>

            {/* Töltés vagy kártyák listája */}
            {loading ? (
                <div className="loader-container">
                    <ClipLoader size={50} color="#FF9800" loading={loading} />
                </div>
            ) : (
                <ul>
                    {filteredCards.map((card) => (
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
