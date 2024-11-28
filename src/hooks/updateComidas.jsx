import axios from "axios";

export const UpdateComida = async ({ name, description, nota, id}) => {
    const { data } = await axios.put(`http://localhost:4444/comida/edit/${id}`, {
        name,
        description,
        nota,
        id
    });
    return data;
};