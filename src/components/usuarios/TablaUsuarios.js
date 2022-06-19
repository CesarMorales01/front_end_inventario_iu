import React from 'react'

const TablaUsuarios = (params) => {

    function formatearFecha(fecha){
        var opciones = { year: 'numeric', month: '2-digit', day: 'numeric' };
        var date = new Date(fecha).toLocaleDateString('es',opciones)
        return date;
      }

  return (
     <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Email</th>
            <th scope="col">Estado</th>
            <th scope="col">Fecha creación</th>
            <th scope="col">Fecha actualización</th>
            <th scope="col">
            <label className='btn btn-outline-info' style={{cursor: 'pointer'}}>
                  Solo activos 
                  <input
                    style={{marginLeft: '0.2em'}}
                    name="isGoing"
                    type="checkbox"
                    checked= {params.soloActivos}
                    onChange={params.changeCheckBox}
                    />
              </label>
            </th>
          </tr>
        </thead>
        <tbody>
          {
            params.datos.map((est, index) => {
              const creación = formatearFecha(est.fechaCreacion)
              const actualización= formatearFecha(est.fechaActualizacion)
              return(
              <tr key={est._id}>
                <th scope="row">{index + 1}</th>
                <td>{est.name}</td>
                <td>{est.email}</td>
                <td>{est.estado ? 'Activo' : 'Inactivo'}</td>
                <td>{creación}</td>
                <td>{actualización}</td>
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

export default TablaUsuarios