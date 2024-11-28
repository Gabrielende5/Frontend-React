import React from 'react';
import ComidaCard from '../comidaCards/ComidaCard'
import './comidaList.css';

function ComidaList({ comidas, setEditMode, deleteComida }) {
    return (
        <div id="comidas-list">
            {comidas.map((comida) => (
                <ComidaCard
                    comida={comida}
                    key={comida.id}
                    setEditMode={setEditMode}
                    deleteComida={deleteComida}
                />
            ))}
        </div>
    )
}

export default ComidaList;
