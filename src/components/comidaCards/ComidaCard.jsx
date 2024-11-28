import React from "react";
import { AiTwotoneEdit, AiFillDelete} from "react-icons/ai";
import "./ComidaCard.css";

function ComidaCard({comida, setEditMode, deleteComida}){
    
    const{name, description, nota, id} = comida;
    return (
        <div id='card' className="comida-card">
            <h1>{name}</h1>
            <div>{description} Descrição</div>
            <div>{nota} Nota</div>
            <div id="icons">
                <AiTwotoneEdit color="yellow" width={32} onClick={()=> setEditMode(comida)}></AiTwotoneEdit>
                <AiFillDelete color="red" width={32} onClick={()=>deleteComida(id)}></AiFillDelete>
            </div>
        </div>
    )

};
export default ComidaCard;



