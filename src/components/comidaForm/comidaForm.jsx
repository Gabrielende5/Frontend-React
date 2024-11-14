import React, {useEffect, useState} from 'react';
import "../form/Form.css"
function MusicForm(props){
    const[name, setNome] = useState(""); // 
    const[description, setDescription] = useState("");
    const[nota, setNota]= useState(0);

    const CadastrarComida = (event)=>{
        event.preventDefault(); // Previne que o formulário não fique atualizando toda hora quando estiver editando ou cadastrando
        let id = undefined; // Serve para que o Banco de dados defina o id, ou seja, siga a ordem "1,2,3..."
        if(props.editingComida){
            id=props.editingComida.id;
        }
        props.createComida({name, description, nota, id});
        props.fecharOModal();

    };
    useEffect(()=>{ // Função de pegar tudo e atualizar sozinho, sem precisar dar f5
        if(props.editingComida){
            setNome(props.editingComida.name);
            setDescription(props.editingComida.description);
            setNota(props.editingComida.nota);

        }
    }, [props.editingComida]);
    return(
        <div className='formularioComida'>
            <form className='form' onSubmit={CadastrarComida}>
                <h1>{props.editingComida ? "Editar":"Cadastrar"}Comida</h1>
                
                <label htmlFor='nome'>Nome</label>
                <input type='text' placeholder='nome' name='nome' id='nome' onChange={(e)=> setNome(e.target.value)} value={name}></input>
                
                <label htmlFor="description">Descrição</label>
                <input name='description' placeholder='description' id='description'onChange={(e)=> setDescription(e.target.value)} value={description} />
                
                <label htmlFor="nota">Nota</label>
                <input name='nota' placeholder='nota' id='nota' onChange={(e)=> setNota(e.target.value)} value={nota}/>

                <button type='submit'>
                    {props.editingComida?"Editar":"Cadastrar"}comida.
                </button>
            </form>
        </div>
    )
}
export default MusicForm;