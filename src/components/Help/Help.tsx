import React, { useState } from 'react'
import HomeButton from '../Buttons/Button';
import './Help.css';
import '../Buttons/Button.css'
import { faClipboardQuestion } from '@fortawesome/free-solid-svg-icons';
import Registro from './HelpPages/Registro';
import InicioSesión from './HelpPages/InicioSesión';
import Configuration from './HelpPages/Configuration';
import User from './HelpPages/User';
import Personalizacion from './HelpPages/Personalizacion';

type Props = {}

const Help = (props: Props) => {
const [activeTab, setActiveTab] = useState<'register' | 'login' | 'settings' | 'user' | 'personalization' | 'accessibility'>();

  const renderContent = () => {
    switch (activeTab) {
        case 'register':
            return <Registro goToLogin={() => setActiveTab('login')}/>
        case 'login':
            return <InicioSesión/>
        case 'settings':
            return <Configuration goToUser={() => setActiveTab('user')} goToThemes={() => setActiveTab('personalization')} goToAcces={() => setActiveTab("accessibility")}/>
        case 'user': 
          return <User/>
        case 'personalization': 
          return <Personalizacion/>
        default:
          return <div className='default-message'>Selecciona una categoría de ayuda</div>;
    }
  }

  return (
    <div className='main-container'>
      <div className='help-nav'>
        <HomeButton buttonText='Registro' icon={faClipboardQuestion} onClick={() => setActiveTab('register')}/>
        <HomeButton buttonText='Inicio de sesión' icon={faClipboardQuestion} onClick={() => setActiveTab('login')}/>
        <HomeButton buttonText='Configuración' icon={faClipboardQuestion} onClick={() => setActiveTab('settings')}/>
        <HomeButton buttonText='Configuración: Usuario' icon={faClipboardQuestion} onClick={() => setActiveTab('user')}/>
        <HomeButton buttonText='Configuración: Personalización' icon={faClipboardQuestion} onClick={() => setActiveTab('personalization')}/>
        {/* <HomeButton buttonText='Configuración: Accesibilidad' icon={faClipboardQuestion} onClick={() => setActiveTab('accessibility')}/> */}
      </div>
      <div className='display'>
        {renderContent()}
      </div>
    </div>
  )
}

export default Help