import { useState } from 'react'
import Iframe from 'react-iframe';
import './App.css'
import PlanoEvento from './assets/planoEvento';
import GetUserLocation from './assets/getUserLocation';

function App() {

  return (
    <div className='container'>
      <div className='row'>
        <h1 className='text'>Google Maps Test</h1>
        <h2>Plano Evento</h2>
        <p>En el plano se muestra el evento y test de buscar direcciones</p>
        <PlanoEvento ancho='100%' alto='400px' />
      </div>
      <div className='row'>
        <h2>Plano Evento</h2>
        <p>Petición a la API de Google Maps para obetener la latitud y longitud de un código postal</p>
        <GetUserLocation />
      </div>
    </div>
  )
}

export default App
