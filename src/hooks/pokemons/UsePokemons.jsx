import axios from 'axios';
import React, { useEffect, useState } from 'react'

export const UsePokemons= ()=> {
  const[data,setData] = useState([]);
  const[loading,setLoading] = useState(true);
  const [error,setError] = useState(null);

  useEffect(()=>{
    const fetchData=async()=>{
        try{
            const response = await axios.get("http://localhost:4444/pokemons");
            const responseData = response.data;
            setData(responseData.results);
        } catch (err){
            setError(err.message);

        } finally{
            setLoading(false);
        }
    }
    fetchData();
  },[]);
  return{loading,error, data}
}
