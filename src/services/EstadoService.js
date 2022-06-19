import { axiosConfig } from "../config/axiosConfig";

export const obtenerTodos = () => {
    return axiosConfig.get(
        '/estado'
    );
}

export const guardar = (estado) => {
    return axiosConfig.post('/estado', estado);
}

export const editarPorId = (id, estado) => {
    return axiosConfig.put('/estado/'+id, estado);
}

export const borrarPorId=(id)=>{
    return axiosConfig.delete('/estado/'+id);
}

export const obtenerSoloActivos=()=>{
    return axiosConfig.get(
        '/estado/active'
    );
}