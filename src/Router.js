import {createBrowserRouter} from "react-router-dom";
import Layout from "./Pages/layout/Layout.jsx";
import ProductPage from "./Pages/productpage/ProductPage.jsx";
import HomePage from "./Pages/homepage/HomePage.jsx";
import Comidas from "./Pages/comidaPage/comidaPage.jsx";
import PokemonPage from "./Pages/pokemonPage/PokemonPage.jsx"
import ChatPage from "./Pages/chatPage/ChatPage.jsx";

export const router = createBrowserRouter([
    {
        path:"/", 
        element:<Layout/>,
        children:[
            {
                path:"/",
                element:<HomePage/>
            },
            {
                path:"products",
                element:<ProductPage/>
            },
            {
                path:"comidas",
                element:<Comidas/>
            },
            {
                path:"pokemons",
                element:<PokemonPage/>
            },
            {
                path: "/chat",
                element:<ChatPage/>
            }
        ]
        }

])