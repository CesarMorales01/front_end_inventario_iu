import React, {useState, useEffect } from 'react'
import { obtenerTodosUsuarios, guardar, editarPorId, borrarPorId, obtenerUsuariosActivos } from '../../services/UsuariosService';
import DialogoEliminar from '../iu/DialogoEliminar';
import Cargando from '../iu/Cargando';
import TablaUsuarios from './TablaUsuarios';
import DialogoAgregarUsuario from './DialogoAgregarUsuario';

const Usuarios = (params) => {

  const [usuarios, setUsuarios] = useState(params.data);
  const [estado, setEstado] = useState({
    _id: null,
    email: '',
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
      getUsuariosActivos()
    }else{
      getUsuarios();
    }  
  },[usuarios, soloActivos]);

  const getUsuariosActivos = () => {
    if(usuarios.length==0){
      obtenerUsuariosActivos().then(r => {
          setUsuarios(r.data)
        }).catch(e => {
            console.log(e)
        })
    }   
  };

  const getUsuarios = () => {
    if(usuarios.length==0){
      obtenerTodosUsuarios().then(r => {
          setUsuarios(r.data)
        }).catch(e => {
            console.log(e)
        })
    }   
  };

  function changeCheckBox(e){
    let array=[]
    setUsuarios(array)
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
      setTimeout(guardarUsu, 500)  
    }
    resetEstado()
  }

  const editar = () => {
    editarPorId(estado._id, estado)
    .then(r => {
      let array=[]
      setUsuarios(array)
      getUsuarios()
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
    setUsuarios(array)
    getUsuarios()
 }

  const guardarUsu = () => {
    guardar(estado)
    .then(r => {
      let array=[]
      setUsuarios(array)
      getUsuarios()
      document.getElementById('btnCloseModal').click()
      changeError(false);
      setLoading(false);
    }).catch(e => {
      console.log(e);
      let error=e.response.data.msg
      if(error=='Ya existe'){
        alert("Ya existe un usuario con este nombre!")
      }
      if(error=='Ya existe email'){
        alert("Ya existe un usuario con este email!")
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
      email: '',
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
      const filter = usuarios.filter(est => est._id == id)[0];
      setEstado({
        ...filter
      });
    }, 500)
  }

 if(usuarios.length>0){
    return (
      <div className="container">
      <br/>
      <h4 style={{textAlign: 'center'}}>Usuarios</h4>
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
     
      <TablaUsuarios
        datos={usuarios}
        openEditById={openEditById}
        confirmarEliminar={confirmarEliminar}
        changeCheckBox={changeCheckBox}
        soloActivos={soloActivos}
      />
      
      <DialogoAgregarUsuario
        titulo='Nuevo usuario'
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
        titulo={'el usuario'}
      />
    </div>
    )
   }else{
    return(
      <Cargando />
    )
   } 
}

export default Usuarios