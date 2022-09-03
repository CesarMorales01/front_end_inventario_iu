import React, {useState, useEffect } from 'react'
import { obtenerTodos, guardar, editarPorId, borrarPorId, obtenerSoloActivos } from '../../services/EstadoService';
import Cargando from '../iu/Cargando';
import DialogoAgregar from '../iu/DialogoAgregar';
import DialogoEliminar from '../iu/DialogoEliminar';
import TablaModulos from '../iu/TablaModulos';

export default function Estado(params) {
  const [estados, setEstados] = useState(params.data);
  const [estado, setEstado] = useState({
    _id: '',
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
        getEstadosActivos();
      }else{
        getEstados();
      }
  },[estados, soloActivos]);


  const getEstados = () => {
    if(estados.length==0){
        obtenerTodos().then(r => {
          setEstados(r.data)
        }).catch(e => {
            console.log(e)
        })
    }   
  };

  const getEstadosActivos = () => {
    if(estados.length==0){
      obtenerSoloActivos().then(r => {
          setEstados(r.data)
        }).catch(e => {
            console.log(e)
        })
    }   
  };

  const changeEstado = e => {
    setEstado({
      ...estado,
      [e.target.name]: e.target.value
    })
  }

  const add = e => {
    setLoading(true);
    e.preventDefault();
    if(estado._id){
      editarEstado();
    }else{
      guardarEstado();
    }
    resetEstado()
  }

  const resetEstado = () => {
    setDisplay('none')
    setEstado({
      _id: '',
      name: '',
      estado: true
    })
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
    setEstados(array)
    getEstados()
  },500) 
}

 const openEditById = id => {
  setDisplay('')
  setLoading(true);
  setTimeout(() => {
  setLoading(false);
    const estadoFilter = estados.filter(est => est._id == id)[0];
    setEstado({
      ...estadoFilter
    });
  }, 500)
}

const editarEstado = () => {
  editarPorId(estado._id, estado)
  .then(r => {
    let array=[]
    setEstados(array)
    getEstados()
    changeError(false)
    setLoading(false);
  }).catch(e => {
    console.log(e);
    changeError(true);
    setLoading(false);
  })
  document.getElementById('exampleModal').click()
}

  const guardarEstado = () => {
    guardar(estado)
    .then(r => {
      let array=[]
      setEstados(array)
      getEstados()
      document.getElementById('btnCloseModal').click()
      changeError(false);
      setLoading(false);
    }).catch(e => {
      console.log(e);
      let error=e.response.data.msg
      if(error=='Ya existe estado'){
        alert("Ya existe un estado con este nombre!")
      }
      changeError(true);
      setLoading(false);
    })
  }

  const closeModal = () => {
    resetEstado()
    changeError(false);
  }

  const changeError = e => {
    setError(e);
  }

  function changeCheckBox(e){
    let array=[]
    setEstados(array)
    setSoloActivos(e.target.checked)
  }

 if(estados.length>0){
  return (
    <div className="container">
    <br/>
    <h4 style={{textAlign: 'center'}}>Estados de equipo</h4>
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
        datos={estados}
        openEditById={openEditById}
        confirmarEliminar={confirmarEliminar}
        changeCheckBox={changeCheckBox}
        soloActivos={soloActivos}
      />
    <DialogoAgregar
    titulo='Nuevo estado'
      estado={estado}
      loading={loading}
      closeModal={closeModal}
      hidden={hidden}
      changeEstado={changeEstado}
      error={error}
      add={add}
      display={display}
     />
    {/*Boton abrir Modal confirmar eliminacion*/}
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
      titulo={'el estado'}
    />
  </div>
  )
 }else{
  return(
    <Cargando />
  )
 }
}