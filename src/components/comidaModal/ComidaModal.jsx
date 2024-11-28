import React from "react";
import "../modal/Modal.css";
import { AiFillCloseCircle } from "react-icons/ai";
import ComidaForm from "../comidaForm/comidaForm";

function comidaModal(props){
    return(
        <div className="fundo">
            <div className="close" onClick={props.fecharOModal}>
                <AiFillCloseCircle size={40} color="white"/>
            </div>
            <div>
                <ComidaForm {...props}/> {/* "..." Para trazer todos os itens de props */}
                
            </div>
        </div>
    )
}

export default comidaModal;
