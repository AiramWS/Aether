import React from 'react'
import HomeButton from '../Buttons/Button';
import './Help.css';
import '../Buttons/Button.css'
import { faClipboardQuestion } from '@fortawesome/free-solid-svg-icons';

type Props = {}

const Help = (props: Props) => {
  return (
    <div className='help-nav'>
      <HomeButton buttonText='Registro' icon={faClipboardQuestion}/>
      <HomeButton buttonText='Inicio de sesión' icon={faClipboardQuestion}/>
      <HomeButton buttonText='Configuración: Usuario' icon={faClipboardQuestion}/>
      <HomeButton buttonText='Configuración: Personalización' icon={faClipboardQuestion}/>
      <HomeButton buttonText='Configuración: Accesibilidad' icon={faClipboardQuestion}/>
    </div>
  )
}

export default Help