import axios from "axios";

export const DeleteComida = async (id) => {
    const { data } = await axios.delete(`http://localhost:4444/comida/delete/${id}`);
    return data;
}
