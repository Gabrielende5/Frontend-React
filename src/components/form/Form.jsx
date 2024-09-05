
import { useState } from "react";
import "./Form.css"

function Form(props){
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState(0);
    
    const CadastrarProduct = () => {
        props.createProduct(name, description, quantity);
        props.fecharOModal();

};
    return(
        <form onSubmit={CadastrarProduct} className={"form"}>
            <h1>Adicionar Anotações</h1>
            <label htmlFor="title">Titulo</label>
            <input type="text" name="title" placeholder="Titulo" id="title" value={name} onChange={(e)=> setName(e.target.value)} />

            <label htmlFor="description">Descrição</label>
            <input type="text" placeholder="Descrição" name="description" id="description" value={description} onChange={(e) => setDescription (e.target.value)} />

            <label htmlFor="quantity">Quantidade</label>
            <input type="text" placeholder="Quantidade" name="quantity" id="quantity" value={quantity} onChange={(e) => setQuantity (e.target.value)} />

            <button>Cadastrar produto</button>
        </form>
    )
}
export default Form;
