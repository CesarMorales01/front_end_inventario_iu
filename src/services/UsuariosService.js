import { axiosConfig } from "../config/axiosConfig";

export const obtenerTodosUsuarios = () => {
    return axiosConfig.get(
        '/usuarios'
    );
}

export const guardar = (usuario) => {
    return axiosConfig.post('/usuarios', usuario);
}

export const editarPorId = (id, usuario) => {
    return axiosConfig.put('/usuarios/'+id, usuario);
}

export const borrarPorId=(id)=>{
    return axiosConfig.delete('/usuarios/'+id);
}

export const obtenerUsuariosActivos = () => {
    return axiosConfig.get(
        '/usuarios/active'
    );
}