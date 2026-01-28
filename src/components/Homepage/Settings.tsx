import React, { useEffect, useState } from 'react'
import HomeButton from '../Buttons/Button';
import { faSliders, faUniversalAccess, faUser, faFile } from '@fortawesome/free-solid-svg-icons';
import UserSettings from '../Settings/UserSettings';
import PreferencesSettings from '../Settings/PreferencesSettings';
import AccesibilitySettings from '../Settings/AccesibilitySettings';
import Informes from '../Settings/Informes';

type SettingsPageProps = {
  onClose: () => void
}

const SettingsPage = ({ onClose }: SettingsPageProps) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'user' | 'preferences' | 'accesibility' | 'informes'>('user');

  useEffect(() => {
    requestAnimationFrame(() => {
      setIsVisible(true);
    });
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const renderContent = () => {
    switch (activeTab) {
        case 'user':
            return <UserSettings/>
        case 'preferences':
            return <PreferencesSettings/>
        case 'accesibility':
            return <AccesibilitySettings/>
        case 'informes':
            return <Informes/>
        default:
            return <UserSettings/>
    }
  }

  const handleClose = () => {
    setIsClosing(true);
    setIsVisible(false);
    
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <div className={`settings ${isVisible ? 'visible' : ''} ${isClosing ? 'closing' : ''}`}>
      <div className='backdrop' onClick={onClose}>
        <div className='settings-frame' onClick={(evt) => evt.stopPropagation()}>
            <div className='switch'>
                <HomeButton
                    buttonText='Usuario'
                    icon={faUser}
                    onClick={() => setActiveTab('user')}
                />
                <HomeButton
                    buttonText='Preferencias'
                    icon={faSliders}
                    onClick={() => setActiveTab('preferences')}
                />
                <HomeButton
                    buttonText='Accesibilidad'
                    icon={faUniversalAccess}
                    onClick={() => setActiveTab('accesibility')}
                />
                <HomeButton
                  buttonText='Informes'
                  icon={faFile}
                  onClick={() => setActiveTab('informes')}
                />
            </div>
            <div className='display'>
                {renderContent()}
            </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage