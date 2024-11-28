import axios from "axios";

export const GetComida = async () => {
    const { data } = await axios.get("http://localhost:4444/comida/");
    return data;
}