import axios from "axios";


export const CreateComida = async ({ name, description, nota }) => {
    const { data } = await axios.post("http://localhost:4444/comida/create", {
        name,
        description,
        nota
    });

    return data;
};