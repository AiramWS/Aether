import './Home.css';
import './Settings.css'
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { faBook, faBookBookmark, faCircleQuestion, faFileZipper, faFolderOpen, faGear, faHomeLg, faPlus, faSearch, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import SettingsPage from './Settings';
import HomeButton from '../Buttons/Button';

interface ElectronAPI {
    openMainWindow: () => void;
    openHelpWindow: () => void;
}

declare global {
    interface Window {
        electronAPI?: ElectronAPI;
    }
}

type Props = {}

type Proyect = {
  name: string,
  bookmarks: number
}

const Home = (props: Props) => {
  const navigate = useNavigate();
  const [showSettings, setShowSettings] = useState(false)

  const  openNewProject = () =>  {
    navigate('/document');
  }

  function createProject() {

  }

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  }
  
  return (
    <div className='main-container'>
      {showSettings && <SettingsPage onClose={toggleSettings}/>}
      <div className='option-nav'>
        <div className='button-container'>
          <HomeButton buttonText='Inicio' icon={faHomeLg}/>
          <HomeButton buttonText='Buscar' icon={faSearch}/>
          <div className='divider'/>
          <div className='proyect-list'>
            <HomeButton buttonText='Nuevo proyecto' icon={faPlus} buttonId='new-project' onClick={createProject}/>
          </div>
          <div className='divider'/>
        </div>
        <div className='menu-footer'>
          <HomeButton buttonText='Configuración' icon={faGear} onClick={toggleSettings}/>
          <HomeButton buttonText='Ayuda' icon={faCircleQuestion} onClick={window.electronAPI?.openHelpWindow}/>
        </div>
      </div>
      <div className='main-screen'>
        <div className='top-menu'>
        </div>
      </div>
    </div>
  )
}

export default Home



