import {createBrowserRouter} from "react-router-dom";
import Layout from "./Pages/layout/Layout.jsx";
import ProductPage from "./Pages/productpage/ProductPage.jsx";
import HomePage from "./Pages/homepage/HomePage.jsx";

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
        ]
        }

])