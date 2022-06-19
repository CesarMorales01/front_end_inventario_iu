import { axiosConfig } from "../config/axiosConfig";

export const obtenerTodosTipos = () => {
    return axiosConfig.get(
        '/tiposequipo'
    );
}

export const guardar = (tipoequipo) => {
    return axiosConfig.post('/tiposequipo', tipoequipo);
}

export const editarPorId = (id, tiposequipo) => {
    return axiosConfig.put('/tiposequipo/'+id, tiposequipo);
}

export const borrarPorId=(id)=>{
    return axiosConfig.delete('/tiposequipo/'+id);
}
