import React, {useState, useEffect } from 'react'

const TablaInventario = (params) => {
  const logo = require('./noPreview.jpg');
  const [photo, setPhoto] = useState(logo);

 function formatearFecha(fecha){
        // lo formatea asi porque con toLocaleDateString me deja la fecha en un dia antes... 
        //Tal vez porque queda registrada en la base de datos con 0 horas y 0 minutos....
        let date= fecha.split("-")
        let dia=date[2].split("T")
        let formatFecha=date[0]+"-"+date[1]+"-"+dia[0]
        return formatFecha;
 }

 function buscarUsuario(id){
  let usua=''
    for(let i=0;i<params.usuarios.length;i++){
      if(params.usuarios[i]._id==id){
        usua=params.usuarios[i].name
      } 
    }
  return usua;
 }

 function buscarMarca(id){
  const marca = params.marcas.filter(est => est._id == id)[0];
  if(!marca){
    return ''
  }else{
    return marca.name
  }
 }

 function buscarEstado(id){
  const filter = params.estados.filter(est => est._id == id)[0];
  if(!filter){
    return ''
  }else{
    return filter.name
  }
 }

 function buscarTipo(id){
  const filter = params.tipos.filter(est => est._id == id)[0];
  if(!filter){
    return ''
  }else{
    return filter.name
  }
 }

function buscarFoto(id, nombreFoto){
  let foto=photo
  if(nombreFoto!=''){
    let baseUrl=process.env.REACT_APP_URL_IMG
    foto=baseUrl+"/"+id+'/image'
  }
  return foto
}


  return (
    <div className="table-responsive">
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Serial</th>
          <th scope="col">Modelo</th>
          <th scope="col">Descripción</th>
          <th scope="col">Color</th>
          <th scope="col">Fecha de compra</th>
          <th scope="col">Precio</th>
          <th scope="col">Usuario a cargo</th>
          <th scope="col">Marca</th>
          <th scope="col">Estado del equipo</th>
          <th scope="col">Tipo de equipo</th>
          <th scope="col">Foto</th>
        </tr>
      </thead>
      <tbody>
        {
          params.datos.map((est, index) => {
            const fechaCompra = formatearFecha(est.fechaCompra)
            const nombreUsu= buscarUsuario(est.usuario)
            const nombreMarca=buscarMarca(est.marca)
            const nombreEstado =buscarEstado(est.estado)
            const nombreTipo=buscarTipo(est.tipoEquipo)
            const foto= buscarFoto(est._id, est.foto)
            return(
            <tr key={est._id}>
              <th scope="row">{index + 1}</th>
              <td>{est.serial}</td>
              <td>{est.modelo}</td>
              <td>{est.descripcion}</td>
              <td>{est.color}</td>
              <td>{fechaCompra}</td>
              <td>{est.precio}</td>
              <td>{nombreUsu}</td>
              <td>{nombreMarca}</td>
              <td>{nombreEstado}</td>
              <td>{nombreTipo}</td>
              <td>
              {est.foto}
                <img src={foto} className='img-fluid' width="80" height="80"/>
              </td>
              <td>
                <button
                  type="button" 
                  className="btn btn-outline-success"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => params.openEditById(est._id)}
                >
                  <i className="fa-solid fa-pen-to-square"></i>-
                </button>
                <button 
                  type="button" 
                  className="btn btn-outline-danger"
                  onClick={() => params.confirmarEliminar(est._id)}
                  >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </td>
            </tr>
            );
          })
        }
      </tbody>
    </table>
  </div>
  )
}

export default TablaInventario