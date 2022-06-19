import React, {useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Estado from '../components/estado/Estado'
import Inventario from '../components/inventario/Inventario'
import BarraNav from '../components/iu/BarraNav'
import Marca from '../components/marca/Marca'
import TipoEquipo from '../components/tipoequipo/TipoEquipo'
import Usuarios from '../components/usuarios/Usuarios'
import { obtenerTodos } from '../../src/services/EstadoService'
import { obtenerTodasMarcas } from '../../src/services/MarcaService';
import { obtenerTodosTipos } from '../../src/services/TipoEquipoService';
import { obtenerTodosUsuarios} from '../../src/services/UsuariosService';

export default function MainRouter() {
  const [estados, setEstados] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  useEffect( () => {
    getEstados();
    getMarcas();
    getTipos();
    getUsuarios(); 
  },[]);

  const getEstados = () => {
        obtenerTodos().then(r => {
          setEstados(r.data)
        }).catch(e => {
            console.log(e)
        })  
  };

  const getMarcas = () => {
      obtenerTodasMarcas().then(r => {
          setMarcas(r.data)
        }).catch(e => {
            console.log(e)
        })
  };

  const getTipos = () => {
      obtenerTodosTipos().then(r => {
          setTipos(r.data)
        }).catch(e => {
            console.log(e)
        })  
  };

  const getUsuarios = () => {
      obtenerTodosUsuarios().then(r => {
          setUsuarios(r.data)
        }).catch(e => {
            console.log(e)
        }) 
  };

  return (
      <BrowserRouter>
        <BarraNav />
        <Routes>
            <Route path='/' element={<Inventario estados={estados} marcas={marcas} tipos={tipos} usuarios={usuarios} />}/>
            <Route path='/estados' element={<Estado data={estados}/>}/>
            <Route path='/marcas' element={<Marca data={marcas}/>}/>
            <Route path='/tipoequipos' element={<TipoEquipo data={tipos}/>}/>
            <Route path='/usuarios' element={ <Usuarios data={usuarios}/>} />
        </Routes>
      </BrowserRouter>
  )
}