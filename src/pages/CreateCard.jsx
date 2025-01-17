import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCard } from '../services/api';
import './CreateCard.css';

const CreateCard = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        responsible: '',
        lastPerformed: '',
        period: 'WEEKLY',
        file: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const maxSize = 10 * 1024 * 1024; // 10 MB

        if (file && file.size > maxSize) {
            alert('A fájl mérete nem haladhatja meg a 10 MB-ot!');
            return;
        }

        setFormData({ ...formData, file });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, responsible, lastPerformed, period, file } = formData;
        const formDataToSend = new FormData();
        formDataToSend.append('name', name);
        formDataToSend.append('responsible', responsible);
        formDataToSend.append('lastPerformed', lastPerformed);
        formDataToSend.append('period', period);
        formDataToSend.append('file', file);

        try {
            await createCard(formDataToSend);
            navigate('/cards');
        } catch (error) {
            console.error('Error creating card:', error);
            alert('Failed to create card.');
        }
    };

    return (
        <div className="create-card-container">
            <button className="btn-back" onClick={() => navigate("/cards")}>Vissza</button>
            <h2>Új kártya hozzáadása</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Kártya neve:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Felelős:</label>
                    <input
                        type="text"
                        name="responsible"
                        value={formData.responsible}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Utolsó elvégzett dátum:</label>
                    <input
                        type="date"
                        name="lastPerformed"
                        value={formData.lastPerformed}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Periódus:</label>
                    <select
                        name="period"
                        value={formData.period}
                        onChange={handleChange}
                        required
                    >
                        <option value="WEEKLY">Heti</option>
                        <option value="MONTHLY">Havi</option>
                        <option value="QUARTERLY">Negyedéves</option>
                        <option value="HALF_YEARLY">Féléves</option>
                        <option value="YEARLY">Éves</option>
                    </select>
                </div>
                <div>
                    <input
                        type="file"
                        name="file"
                        onChange={handleFileChange}
                        required
                    />
                </div>
                <button type="submit">Kártya hozzáadása</button>
            </form>
        </div>
    );
};

export default CreateCard;
