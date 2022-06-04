import React, {useState, useEffect } from 'react'
import { obtenerTodos } from '../../services/EstadoService';

export default function Estado() {

  useEffect( () => {
    const getEstados = () => {
        obtenerTodos().then(r => {
            console.log(r.data)
        }).catch(e => {
            console.log(e)
        })
    };
    getEstados();
  }, []);


  return (
    <div className='container'>Estado</div>
  )
}