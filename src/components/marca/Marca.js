import React, {useState, useEffect } from 'react'
import { obtenerTodasMarcas, guardar, editarPorId, borrarPorId, obtenerTodasMarcasActivas } from '../../services/MarcaService';
import TablaModulos from '../iu/TablaModulos';
import DialogoAgregar from '../iu/DialogoAgregar';
import DialogoEliminar from '../iu/DialogoEliminar';
import Cargando from '../iu/Cargando';

export default function Marca(params) {

  const [marcas, setMarcas] = useState(params.data);
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
        getMarcasActivas()
      }else{
        getMarcas(); 
      } 
  },[marcas, soloActivos]);

  const getMarcas = () => {
    if(marcas.length==0){
      obtenerTodasMarcas().then(r => {
          setMarcas(r.data)
        }).catch(e => {
            console.log(e)
        })
    }   
  };

  const getMarcasActivas = () => {
    if(marcas.length==0){
      obtenerTodasMarcasActivas().then(r => {
          setMarcas(r.data)
        }).catch(e => {
            console.log(e)
        })
    }   
  };

  function changeCheckBox(e){
    let array=[]
    setMarcas(array)
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
      setTimeout(guardarMarca, 500)  
    }
    resetEstado()
  }

  const editar = () => {
    editarPorId(estado._id, estado)
    .then(r => {
      let array=[]
      setMarcas(array)
      getMarcas()
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
    let array=[]
    setMarcas(array)
    getMarcas()
 }

  const guardarMarca = () => {
    guardar(estado)
    .then(r => {
      let array=[]
      setMarcas(array)
      getMarcas()
      document.getElementById('btnCloseModal').click()
      changeError(false);
      setLoading(false);
    }).catch(e => {
      console.log(e);
      let error=e.response.data.msg
      if(error=='Ya existe'){
        alert("Ya existe una marca con este nombre!")
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
      const filter = marcas.filter(est => est._id == id)[0];
      setEstado({
        ...filter
      });
    }, 500)
  }


 if(marcas.length>0){
  return (
    <div className="container">
    <br/>
    <h4 style={{textAlign: 'center'}}>Marcas</h4>
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
      datos={marcas}
      openEditById={openEditById}
      confirmarEliminar={confirmarEliminar}
      changeCheckBox={changeCheckBox}
      soloActivos={soloActivos}
    />

    <DialogoAgregar
      titulo='Nueva marca'
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
      titulo={'la marca'}
    />
  </div>
  )
 }else{
  return(
    <Cargando />
  )
 } 
  
}