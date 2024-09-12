import React from 'react';
import './Modal.css';
import Form from "../form/Form";
import { AiFillCloseCircle } from "react-icons/ai";
function Modal(props) {
    return (
        <div className='fundo'>
            <div className='closeModal' onClick={() => props.fecharOModal()}>
                <AiFillCloseCircle size={40} color='white' />
            </div>
            <div>
                <Form
                    fecharOModal={props.fecharOModal}
                    createProduct={props.createProduct}
                    {...props}
                />
            </div>
        </div>
    )
}

export default Modal;