import React, {useState, useEffect } from 'react'
import { obtenerTodosTipos, guardar, editarPorId, borrarPorId } from '../../services/TipoEquipoService';
import TablaModulos from '../iu/TablaModulos';
import DialogoAgregar from '../iu/DialogoAgregar';
import DialogoEliminar from '../iu/DialogoEliminar';
import Cargando from '../iu/Cargando';

export default function TipoEquipo(params) {

  const [tipos, setTipos] = useState(params.data);
  const [tiposActivos, setTiposActivos] = useState([]);
  const [estado, setEstado] = useState({
    _id: null,
    name: '',
    estado: true
  })
  const [error, setError] = useState(false);
  const [idEliminar, setIdEliminar] = useState(0);
  const [hidden] = useState('hidden');
  const [display, setDisplay] = useState('none');
  const [loading, setLoading] = useState(false);
  const [soloActivos, setSoloActivos] = useState(false);

  useEffect( () => {
    if(soloActivos){
      getTiposActivos()
    }else{
      getTipos()
    }
  },[tipos, soloActivos]);


  const getTipos = () => {
    if(tipos.length==0){
      obtenerTodosTipos().then(r => {
          setTipos(r.data)
        }).catch(e => {
            console.log(e)
        })
    }   
  };

  const getTiposActivos = () => {
    if(tipos.length==0){
      setTipos(tiposActivos)
    }   
  };

  function changeCheckBox(e){
    const filter = tipos.filter(est => est.estado == true);
    setTiposActivos(filter)
    let array=[]
    setTipos(array)
    setSoloActivos(e.target.checked)
  }

  const changeEstado = e => {
    setEstado({
      ...estado,
      [e.target.name]: e.target.value
    })
  }

  const add = e => {
    setLoading(true)
    e.preventDefault()
    if(estado._id){
      editar()
    }else{
      setTimeout(guardarTipo, 500)  
    }
    resetEstado()
  }

  const editar = () => {
    editarPorId(estado._id, estado)
    .then(r => {
      let array=[]
      setTipos(array)
      getTipos()
      changeError(false)
      setLoading(false);
    }).catch(e => {
      console.log(e);
      changeError(true);
      setLoading(false);
    })
    document.getElementById('exampleModal').click()
  }

  const confirmarEliminar = id =>{
    setIdEliminar(id)
    document.getElementById('botonDialogoEliminar').click()
  }

 function borrar(){
    document.getElementById('botonDialogoEliminar').click()
    borrarPorId(idEliminar)
    recargarVista()
 }

 function recargarVista(){
  setTimeout(()=>{
    let array=[]
    setTipos(array)
    getTipos()
  },500) 
}

  const guardarTipo = () => {
    guardar(estado)
    .then(r => {
      let array=[]
      setTipos(array)
      getTipos()
      document.getElementById('btnCloseModal').click()
      changeError(false);
      setLoading(false);
    }).catch(e => {
      console.log(e);
      let error=e.response.data.msg
      if(error=='Ya existe'){
        alert("Ya existe un tipo de equipo con este nombre!")
      }
      changeError(true);
      setLoading(false);
    })
  }

  const resetEstado = () => {
    setDisplay('none')
    setEstado({
      _id: null,
      name: '',
      estado: true
    })
  }

  const closeModal = () => {
    resetEstado()
    changeError(false);
  }

  const changeError = e => {
    setError(e);
  }

  const openEditById = id => {
    setDisplay('')
    setLoading(true);
    setTimeout(() => {
    setLoading(false);
      const filter = tipos.filter(est => est._id == id)[0];
      setEstado({
        ...filter
      });
    }, 500)
  }


  if(tipos.length>0){
    return (
      <div className="container">
      <br/>
      <h4 style={{textAlign: 'center'}}>Tipos de equipos</h4>
      <button 
        type="button"
        className="btn btn-outline-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        <i className="fa-solid fa-plus"></i>
         Agregar
      </button>
      <br/>
      <TablaModulos
        datos={tipos}
        openEditById={openEditById}
        confirmarEliminar={confirmarEliminar}
        changeCheckBox={changeCheckBox}
        soloActivos={soloActivos}
      />
      <DialogoAgregar
      titulo='Nuevo tipo de equipo'
        estado={estado}
        loading={loading}
        closeModal={closeModal}
        hidden={hidden}
        changeEstado={changeEstado}
        error={error}
        add={add}
        display={display}
       />
  
      <button 
        type="button"
        id='botonDialogoEliminar'
        data-bs-toggle="modal"
        data-bs-target="#dialogoEliminar"
        style={{display:'none'}}
      >
      </button>
      <DialogoEliminar
        borrar={borrar}
        titulo={'el tipo de equipo'}
      />
    </div>
    )
   }else{
    return(
      <Cargando />
    )
   } 

}