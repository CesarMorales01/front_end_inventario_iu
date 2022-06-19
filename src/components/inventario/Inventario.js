import React, {useState, useEffect } from 'react'
import { obtenerTodos, guardar, editarPorId, borrarPorId, subirFoto } from '../../services/InventariosService';
import TablaInventario from './TablaInventario';
import Cargando from '../iu/Cargando';
import DialogoAgregarInventario from './DialogoAgregarInventario';
import DialogoEliminar from '../iu/DialogoEliminar';

const Inventario = (params) => {

const [inventarios, setInventarios] = useState([]);
const [item, setItem] = useState({
    _id: null,
    serial: '',
    modelo: '',
    descripcion: '',
    fechaCompra: '',
    color: '',
    precio: '',
    usuario:'',
    marca: '',
    estado: '',
    tipoEquipo: '',
    foto: ''
  })
const [display, setDisplay] = useState('none'); 
const [hidden] = useState('hidden');
const [loading, setLoading] = useState(false);
const [error, setError] = useState(false);
const [idEliminar, setIdEliminar] = useState(0);
const [editar, setEditar] = useState(false);
const [file, setFile] = useState([]);

 useEffect( () => {
        getInventarios(); 
 },[inventarios]);


 const getInventarios = () => {
    if(inventarios.length==0){
        obtenerTodos().then(r => {
          setInventarios(r.data)
        }).catch(e => {
            console.log(e)
        })
    }        
  };

  const add = e => {
    e.preventDefault();
    setLoading(true);
    if(item._id){
      editarEstado();
    //  subirPhoto()
    }else{
      guardarItem();
    }
   resetEstado()
  }

  function subirPhoto (){
    subirFoto(item._id, file)
  }

  const guardarItem = () => {
    guardar(item)
    .then(r => {
      let array=[]
      setInventarios(array)
      getInventarios()
      document.getElementById('btnCloseModal').click()
      changeError(false);
      setLoading(false);
    }).catch(e => {
      console.log(e);
      let error=e.response.data.msj
      if(error=='Ya existe serial o modelo!' || error==('Ya existe serial!')){
        alert(error)
      }
      changeError(true);
      setLoading(false);
    })
  }

  const changeError = e => {
    setError(e);
  }

  const resetEstado=()=>{
    setItem({_id: null,
        serial: '',
        modelo: '',
        descripcion: '',
        fechaCompra: '',
        color: '',
        precio: '',
        usuario:'',
        marca: '',
        estado: '',
        tipoEquipo: '',
        foto: ''})
  }

  const changeItem = e => {
    setItem({
      ...item,
      [e.target.name]: e.target.value
    })
  }

  const changeImageFile = e => {
    setFile(e.target.files[0])
  }

const closeModal = () => {
    resetEstado()
    changeError(false);
    setEditar(false)
}
  
  const confirmarEliminar = id =>{
    setIdEliminar(id)
    document.getElementById('botonDialogoEliminar').click()
  }

 function borrar(){
    document.getElementById('botonDialogoEliminar').click()
    borrarPorId(idEliminar)
    let array=[]
    setInventarios(array)
    getInventarios()
 }  

 const openEditById = id => {
  setEditar(true)
  setDisplay('')
  setLoading(true);
  setTimeout(() => {
  setLoading(false);
    const filter = inventarios.filter(est => est._id == id)[0];
    setItem({
      ...filter
    });
  }, 500)
}

const editarEstado = () => {
  editarPorId(item._id, item)
  .then(r => {
    let array=[]
    setInventarios(array)
    getInventarios()
    changeError(false)
    setLoading(false);
  }).catch(e => {
    console.log(e);
    changeError(true);
    setLoading(false);
  })
  document.getElementById('exampleModal').click()
}

if(inventarios.length>0){
 return (
    <div className="container">
        <br/>
        <h4 style={{textAlign: 'center'}}>Inventario</h4>
        <button 
        type="button"
            className="btn btn-outline-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            >
            <i className="fa-solid fa-plus"></i>
            Agregar
        </button>
        <TablaInventario
            datos={inventarios}
            estados={params.estados}
            marcas={params.marcas} 
            tipos={params.tipos} 
            usuarios={params.usuarios}
            confirmarEliminar={confirmarEliminar}
            openEditById={openEditById}     
        />  
        
        
        <DialogoAgregarInventario 
            titulo='Nuevo equipo'
            item={item}
            display={display}
            hidden={hidden}
            estados={params.estados}
            marcas={params.marcas} 
            tipos={params.tipos} 
            usuarios={params.usuarios}
            changeItem={changeItem}
            changeImageFile={changeImageFile}
            add={add} 
            loading={loading}
            closeModal={closeModal}
            editar={editar}
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
                titulo={'el equipo'}
            />
   </div> 
 )   
}else{
    return(
        <Cargando />
    )
}
  
}

export default Inventario