import React from 'react'

const DialogoAgregarUsuario = (params) => {
  return (
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"   aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">{params.estado._id ? 'Editar Estado': params.titulo}</h5>
          {
          (params.loading && <div style={{marginLeft:'6em'}} className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>)
            }
          <button 
            type="button" 
            className="btn-close" 
            data-bs-dismiss="modal" 
            aria-label="Close"
            onClick={params.closeModal}
          >
          </button>
        </div>
        <div className="modal-body">
          <form onSubmit={params.add}>
          <input type={params.hidden} name="_id" value={params.estado._id ? params.estado._id: ''}></input>
            <div className="mb-3">
              <label htmlFor="recipient-name" className="col-form-label">Nombre:</label>
              <input
                required
                type="text" 
                className="form-control" 
                value={params.estado.name}
                onChange={params.changeEstado}
                name="name"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="recipient-name" className="col-form-label">Email:</label>
              <input
                required
                type="text" 
                className="form-control" 
                value={params.estado.email}
                onChange={params.changeEstado}
                name="email"
              />
            </div>

            <div id='selectEstado' style={{display: params.display}} className="mb-3">
              <label htmlFor="message-text" className="col-form-label">Estado:</label>
              <select   
                required
                className="form-select" 
                aria-label="Default select example"
                value={params.estado.estado}
                onChange={params.changeEstado}
                name="estado"
              >
                <option value={true}>Activo</option>
                <option value={false}>Inactivo</option>
              </select>
            </div>
            <div className="modal-footer">
              <div className={params.error ? 'alert alert-danger': 'd-none'} role="alert">
                ¡Ha ocurrido un error!
              </div>
              <button 
                type="button" 
                className="btn btn-secondary" 
                data-bs-dismiss="modal"
                id='btnCloseModal'
                onClick={params.closeModal}
              >
                Cerrar
              </button>
              <button type="submit" className="btn btn-primary">Guardar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  )
}

export default DialogoAgregarUsuario