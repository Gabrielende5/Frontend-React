import React, {useState} from "react";
import "./AddButton.css"

function AddButton(props){
    const [mouse, setMouse] = useState(true);
    return (
        <div onMouseLeave={()=> setMouse(true)} onMouseEnter={()=>setMouse(false)} onClick={()=> props.abrirOModal()} className={`${mouse?"addNewButton": "addNewButton-mouse"}`}>
            {mouse?"+": props.texto}
        </div>
    )
}
export default AddButton;