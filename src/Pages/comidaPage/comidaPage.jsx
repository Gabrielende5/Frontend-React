import React, { useEffect, useState } from "react";
import ComidaList from "../../components/comidaList/comidaList";
import { GetComida } from "../../hooks/getComidas";
import AddButton from "../../components/ui/addButton/AddButton";
import { DeleteComida } from "../../hooks/deleteComidas";
import { CreateComida } from "../../hooks/createComidas";
import { UpdateComida } from "../../hooks/updateComidas";
import ComidaModal from "../../components/comidaModal/ComidaModal.jsx";

function Comidas() {

    const [isOpen, setIsOpen] = useState(false);
    const [comida, setComida] = useState([]);
    const [editingComida, setEditingComida] = useState(null);

    const mudarModal = () => {
        setIsOpen(prevState => !prevState);
    }


    const deleteComida = async (id) => {
        try {
            const res = await DeleteComida(id);
            if (res) {
                setComida(comida.filter((comida) => comida.id !== id));
            }
            setEditingComida(null);
        } catch (error) {
            console.error("Error deleting comida:", error);
        }
    };

    useEffect(() => {
        GetComida().then((response) => setComida(response));
    }, []);

    return (
        <div>
            <AddButton abrirOModal={mudarModal} texto="Adicionar uma comida" />
            <ComidaList
                comidas={comida}
                setEditMode={(comida) => {
                    setEditingComida(comida);

                    mudarModal();
                }}
                deleteComida={(id) => deleteComida(id)}
            />
            {isOpen && (
                <ComidaModal
                    createComida={async (comida) => {
                        if (comida.id) {
                            const res = await UpdateComida(comida);
                            setComida((prevState) =>
                                prevState.map((oldComida) =>
                                    oldComida.id === comida.id ? res : oldComida
                                )
                            );
                        } else {
                            const res = await CreateComida(comida);
                            setComida((prevState) => [...prevState, res]);
                        }
                        setEditingComida(null);
                    }}
                    editingComida={editingComida}
                    fecharOModal={() => {
                        mudarModal();
                        setEditingComida(null);
                    }}
                />
            )}
        </div>
    );
}

export default Comidas;