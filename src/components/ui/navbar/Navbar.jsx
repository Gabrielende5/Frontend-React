import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"

function Navbar (){
    return (
        <div>
            <Link to='/'>Home</Link>
            <Link to='/products'>Produtos</Link>
        </div>
    )
}
export default Navbar