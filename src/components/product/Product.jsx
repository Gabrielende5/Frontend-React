import React from 'react'
import "./Product.css"
import { AiTwotoneEdit, AiFillDelete } from "react-icons/ai";
function Product(props) {
    return (
        <div className="product-card">
            <h1>{props.name}</h1>
            <h2>{props.description}</h2>
            <h2>{props.quantity}</h2>
            <h3>{FormatarData(props.createdAt)}</h3>
            <div id="icons">
                <AiTwotoneEdit
                    color="black"
                    width={32}
                    onClick={() => props.setEditMode(props)}
                />
                <AiFillDelete
                    color="red"
                    width={32}
                    onClick={() => props.deleteProduct(props._id)}
                />
            </div>
        </div>
    );
}

export default Product;