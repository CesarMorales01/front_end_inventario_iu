import { axiosConfig } from "../config/axiosConfig";

export const obtenerTodos = () => {
    return axiosConfig.get(
        '/inventarios'
    );
}

export const guardar = (inv) => {
    return axiosConfig.post('/inventarios', inv);
}

export const editarPorId = (id, inv) => {
    return axiosConfig.put('/inventarios/'+id, inv);
}

export const borrarPorId=(id)=>{
    return axiosConfig.delete('/inventarios/'+id);
}

export const subirFoto=(id, file)=>{
    const headers = {
        'Content-Type':  "multipart/form-data"
    }
    const data = new FormData();
    data.append('name', 'foto')
    data.append('file', file);

    return axiosConfig.post('/inventarios/'+id+'/upload-image', data, {
        headers: headers
    });
}