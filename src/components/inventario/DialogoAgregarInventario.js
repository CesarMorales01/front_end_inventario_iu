import React, {useState, useEffect } from 'react'


const DialogoAgregarInventario = (params) => {
    const [fechaHoy, setFechaHoy] = useState('');
    const [editar, setEditar] = useState(params.editar);
    const logo = require('./noPreview.jpg');
    const [photo, setPhoto] = useState(logo);

    useEffect( () => {
        todayDate()
    },[]);


    useEffect(()=>{
        cargarSelects()  
        setTimeout(() => {
            validarImagen()
        }, 1000);
        
    },[editar])


    function validarImagen(){
       let id=document.getElementById('inputId').value
       if(id!=''){
            let baseUrl=process.env.REACT_APP_URL_IMG
            setPhoto(baseUrl+'/'+id+'/image')
       }else{
        setPhoto(logo)
       }
    }

    if(editar!=params.editar){
        setEditar(params.editar)
    }

    function cargarSelects(){
        setTimeout(()=>{
            if(editar && document.getElementById('selectUsuario')==null){}else{
                document.getElementById('selectUsuario').click()
                setTimeout(()=>{
                    document.getElementById('selectMarca').click()
                    setTimeout(()=>{
                        document.getElementById('selectEstado').click()
                        setTimeout(()=>{
                            document.getElementById('selectTipo').click()
                            setTimeout(()=>{
                                document.getElementById('inputFechaCompra').click()
                            },100)
                        },100)
                    }, 100)
                },100)
            }
        },100) 
    }

    function todayDate(){
        var fecha = new Date(); //Fecha actual
        var mes = fecha.getMonth()+1; //obteniendo mes
        var dia = fecha.getDate(); //obteniendo dia
        var ano = fecha.getFullYear(); //obteniendo año
        if(dia<10)
        dia='0'+dia; //agrega cero si el menor de 10
        if(mes<10)
        mes='0'+mes //agrega cero si el menor de 10
        setFechaHoy(ano+"-"+mes+"-"+dia)
    }

  return (
    <div className="modal fade bd-example-modal-lg" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"   aria-hidden="true">
    <div className="modal-dialog modal-lg">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">{params.item._id ? 'Editar equipo': params.titulo}</h5>
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
          <input type={params.hidden} name="_id" id='inputId' value={params.item._id ? params.item._id: ''}></input>
            
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-12" >
                <div className="mb-3">
                    <label htmlFor="recipient-name" className="col-form-label">Serial:</label>
                    <input
                        required   
                        type="text" 
                        className="form-control" 
                        value={params.item.serial}
                        onChange={params.changeItem}
                        name="serial"
                    />
                </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12" >
                <div className="mb-3">
                    <label htmlFor="recipient-name" className="col-form-label">Modelo:</label>
                    <input
                        required
                        type="text" 
                        className="form-control" 
                        value={params.item.modelo}
                        onChange={params.changeItem}
                        name="modelo"
                    />
                </div>
            </div>
        </div>    

        <div className="mb-3">
              <label htmlFor="recipient-name" className="col-form-label">Descripción:</label>
              <textarea
                required
                type="text" 
                className="form-control" 
                value={params.item.descripcion}
                onChange={params.changeItem}
                name="descripcion"
              />
        </div>  

         <div className="row">
            <div className="col-lg-4 col-md-4 col-sm-12 col-12" >
                <div className="mb-3">
                    <label htmlFor="recipient-name" className="col-form-label">Fecha de compra:</label>
                    <input
                        id='inputFechaCompra'
                        type="date" 
                        className="form-control" 
                        defaultValue={fechaHoy}
                        onClick={params.changeItem}
                        onChange={params.changeItem}
                        name="fechaCompra"
                    />
                </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12 col-12" >
                <div className="mb-3">
                    <label htmlFor="recipient-name" className="col-form-label">Color:</label>
                    <input
                        required
                        type="text" 
                        className="form-control" 
                        value={params.item.color}
                        onChange={params.changeItem}
                        name="color"
                    />
                </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12 col-12" >
                <div className="mb-3">
                    <label htmlFor="recipient-name" className="col-form-label">Precio:</label>
                    <input
                        required
                        type="number" 
                        className="form-control" 
                        value={params.item.precio}
                        onChange={params.changeItem}
                        name="precio"
                    />
                </div>
            </div>
        </div>  

        <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-12" >
                <div className="mb-3">
                    <label htmlFor="message-text" className="col-form-label">Usuario:</label>
                    <select 
                        value={params.item.usuario}
                        id='selectUsuario'  
                        required
                        className="form-select" 
                        aria-label="Default select example"
                        name="usuario"
                        onClick={params.changeItem}
                        onChange={params.changeItem}
                    >
                    {params.usuarios.map((item, index)=>{
                        if(item.estado){
                            return(
                                <option key={index} value={item._id}>{item.name}</option>     
                            )
                        } 
                    })}      
                    </select>
                </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12" >
                <div  className="mb-3">
                    <label htmlFor="message-text" className="col-form-label">Marca:</label>
                    <select
                        id='selectMarca'   
                        required
                        className="form-select" 
                        aria-label="Default select example"
                        value={params.item.marca}
                        onClick={params.changeItem}
                        onChange={params.changeItem}
                        name="marca"
                    >
                        {params.marcas.map((item, index)=>{
                        if(item.estado){
                            return(
                                <option key={index} value={item._id}>{item.name}</option>     
                            )     
                        }     
                    })} 
                    </select>
                </div>
            </div>
        </div>    

        <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-12" >
                <div className="mb-3">
                    <label htmlFor="message-text" className="col-form-label">Estado:</label>
                    <select
                        id='selectEstado'   
                        required
                        className="form-select" 
                        aria-label="Default select example"
                        value={params.item.estado}
                        onClick={params.changeItem}
                        onChange={params.changeItem}
                        name="estado"
                    >
                        {params.estados.map((item, index)=>{
                        if(item.estado){
                            return(
                                <option key={index} value={item._id}>{item.name}</option>     
                            )
                        }     
                    })} 
                    </select>
                </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12" >
                <div  className="mb-3">
                    <label htmlFor="message-text" className="col-form-label">Tipo de equipo:</label>
                    <select
                        id='selectTipo'   
                        required
                        className="form-select" 
                        aria-label="Default select example"
                        onClick={params.changeItem}
                        onChange={params.changeItem}
                        name="tipoEquipo"
                        value={params.item.tipoEquipo}
                    >
                        {params.tipos.map((item, index)=>{
                            if(item.estado){
                                return(
                                    <option key={index} value={item._id}>{item.name}</option>     
                                )
                            }
                    })} 
                    </select>
                </div>
            </div>
        </div>  

        <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-12" >
                <div className="mb-3">
                    <label htmlFor="message-text" className="col-form-label">Imagen:</label>
                    <input
                        
                        type="file" 
                        className="form-control" 
                        onChange={params.changeImageFile}
                        name="foto"
                    />
                </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12" >
                <div  className="mb-3">
                    <img src={photo} className='img-fluid' width="160" height="160"/>
                </div>
            </div>
        </div>        

            <div className="modal-footer">
              <div className={params.error ? 'alert alert-danger': 'd-none'} role="alert">
                ¡Ha ocurrido un error!
              </div>
              <button 
                type="submit" 
                className="btn btn-secondary" 
                data-bs-dismiss="modal"
                id='btnCloseModal'
                onClick={params.closeModal}
              >
                Cerrar
              </button>          
              <button type="submit" className="btn btn-primary">{params.item._id ? 'Editar': 'Guardar'}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  )
}

export default DialogoAgregarInventario