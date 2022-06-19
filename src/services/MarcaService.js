import { axiosConfig } from "../config/axiosConfig";

export const obtenerTodasMarcas = () => {
    return axiosConfig.get(
        '/marca'
    );
}

export const guardar = (marca) => {
    return axiosConfig.post('/marca', marca);
}

export const editarPorId = (id, marca) => {
    return axiosConfig.put('/marca/'+id, marca);
}

export const borrarPorId=(id)=>{
    return axiosConfig.delete('/marca/'+id);
}

export const obtenerTodasMarcasActivas = () => {
    return axiosConfig.get(
        '/marca/active'
    );
}