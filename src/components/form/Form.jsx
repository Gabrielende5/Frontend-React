import React, { useEffect, useState } from "react";
import "./Form.css";
function Form(props) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState(0);

    const CadastrarProduct = () => {
        let id = undefined;
        if (props.editingProduct) {
            id = props.editingProduct._id;
        }
        props.createProduct(name, description, quantity, id);
        props.fecharOModal();
    };
    useEffect(() => {
        if (props.editingProduct) {
            setName(props.editingProduct.name);
            setDescription(props.editingProduct.description);
            setQuantity(props.editingProduct.quantity);
        }
    }, []);
    return (
        <form onSubmit={CadastrarProduct} className={"form"}>
            <h1>{props.editingProduct ? "Editar" : "Adicionar"} Produto</h1>
            <label htmlFor="title">Nome</label>
            <input
                type="text"
                placeholder="Nome do produto"
                name="title"
                id="title"
                onChange={(e) => setName(e.target.value)}
                value={name}
            />
            <label htmlFor="description">Descrição</label>
            <input
                value={description}
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descrição da anotação"
                name="description"
                id="description"
            />
            <label htmlFor="quantity">Quantidade</label>
            <input
                value={quantity}
                type="text"
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Quantidade"
                name="quantity"
                id="quantity"
            />
            <button>{props.editingProduct ? "Editar" : "Criar"} produto.</button>
        </form>
    );
}

export default Form;