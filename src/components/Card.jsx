import React from 'react';
import './Card.css';

const Card = ({ card, pdfPreviewId, imagePreviewId, handlePdfPreview, handleImagePreview, handleDelete }) => {
    const periodMap = {
        WEEKLY: 'HETI',
        MONTHLY: 'HAVI',
        QUARTERLY: 'NEGYEDÉVES',
        HALF_YEARLY: 'FÉLÉVES',
        YEARLY: 'ÉVES'
    };

    const periodText = periodMap[card.period] || card.period;

    return (
        <div className="card-item" key={card.id}>
            <div className="card-content">
                <strong>{card.name} ({periodText})</strong>
            </div>
            <div className="card-content">
                <strong>Utoljára elvégzett:</strong> {card.lastPerformed}
            </div>
            <div className="card-content">
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
                            <div className="image-preview-container">
                                <img
                                    src={`data:${card.fileType};base64,${card.fileData}`}
                                    alt="Card Attachment"
                                    className="card-image"
                                />
                            </div>
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
                                title={`PDF Preview - ${card.name}`}
                            ></iframe>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Card;
