import React, { useState, useRef, useEffect } from 'react'
import { supabase } from '../../lib/supabase';
import './UserSettings.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera, faPen, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

type UserData = {
  name: string;
  email: string;
  bio: string;
  language: string;
  avatar?: string;
  autoSave?: '30s' | '2min' | '5min' | 'manual';
}

const UserSettings = () => {
  const initialUserData: UserData = {
    name: 'Usuario',
    email: 'usuario@aether.com',
    bio: 'Narrador y creador de mundos',
    language: 'es',
  }
  
  const [userData, setUserData] = useState<UserData>(initialUserData)
  const [avatar, setAvatar] = useState<string>('')
  const [isEditingName, setIsEditingName] = useState(false)
  const [tempName, setTempName] = useState(userData.name)
  const [isHoveringName, setIsHoveringName] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const nameInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user && user.email) {
        const savedData = localStorage.getItem('aether-user-settings')
        if (savedData) {
          const parsedData: UserData = JSON.parse(savedData)
          setUserData({
            name: parsedData.name || user.user_metadata?.name || 'Usuario',
            email: user.email,
            bio: parsedData.bio || 'Narrador y creador de mundos',
            language: parsedData.language || 'es',
            avatar: parsedData.avatar || ''
          })
        } else {
          setUserData({
            name: user.user_metadata?.name || 'Usuario',
            email: user.email,
            bio: 'Narrador y creador de mundos',
            language: 'es'
          })
        }
      }
    }
    
    getUser()
  }, [])

    // CARGAR DATOS GUARDADOS AL INICIAR
  useEffect(() => {
    const savedData = localStorage.getItem('aether-user-settings')
    if (savedData) {
      try {
        const parsedData: UserData = JSON.parse(savedData)
      
        setUserData({
          name: parsedData.name || initialUserData.name,
          email: parsedData.email || initialUserData.email,
          bio: parsedData.bio || initialUserData.bio,
          language: parsedData.language || initialUserData.language,
          avatar: parsedData.avatar || '' 
        })
        
        setTempName(parsedData.name || initialUserData.name)
        
        if (parsedData.avatar) {
          setAvatar(parsedData.avatar)
        }
      } catch (error) {
        console.error('Error cargando datos del usuario:', error)
      }
    }
  }, [])

  useEffect(() => {
    setTempName(userData.name)
  }, [userData.name])

  useEffect(() => {
    if (isEditingName && nameInputRef.current) {
      nameInputRef.current.focus()
      nameInputRef.current.select()
    }
  }, [isEditingName])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setUserData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

 const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('La imagen es demasiado grande. Máximo 2MB.')
        return
      }
      
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        setAvatar(base64String)
        
        setUserData(prev => ({
          ...prev,
          avatar: base64String
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const removeAvatar = () => {
    setAvatar('')
  }

  const startEditingName = () => {
    setTempName(userData.name)
    setIsEditingName(true)
  }

  const saveName = () => {
    if (tempName.trim() !== '' && tempName !== userData.name) {
      setUserData(prev => {
        return { ...prev, name: tempName.trim() }
      })
    }

    setIsEditingName(false)
    setIsHoveringName(false)
  }

  const cancelEditName = () => {
    setTempName(userData.name)
    setIsEditingName(false)
    setIsHoveringName(false)
  }

  const handleNameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      saveName()
    } else if (e.key === 'Escape') {
      cancelEditName()
    }
  }

const saveChanges = () => {
  try {
    const dataToSave: UserData = {
      name: userData.name,
      email: userData.email,
      bio: userData.bio,
      language: userData.language,
      avatar: avatar || undefined
    }
      localStorage.setItem('aether-user-settings', JSON.stringify(dataToSave))
      
      const saveBtn = document.querySelector('.save-btn-small') as HTMLButtonElement
      if (saveBtn) {
        const originalText = saveBtn.textContent
        saveBtn.textContent = '✓ Guardado'
        saveBtn.style.backgroundColor = 'var(--color-secondary)'
        
        setTimeout(() => {
          saveBtn.textContent = originalText
          saveBtn.style.backgroundColor = ''
        }, 2000)
      }
    } catch (error) {
      console.error('Error guardando datos:', error)
    }
  }

  return (
    <div className='user-settings'>
      <div className='user-header'>
        <h3>Cuenta</h3>
        <button 
          className='save-btn-small'
          onClick={saveChanges}
          title='Guardar cambios'
        >
          Guardar
        </button>
      </div>
      
      <div className='compact-divider'/>
      
      <div className='user-profile-header'>
        <div className='avatar-container' onClick={handleAvatarClick}>
          <div className='avatar-wrapper'>
            {avatar ? (
              <img src={avatar} alt="Avatar" className='avatar-image' />
            ) : (
              <div className='avatar-placeholder'>
                {userData.name.charAt(0).toUpperCase()}
              </div>
            )}
            <div className='avatar-overlay'>
              <FontAwesomeIcon icon={faCamera} />
              <span>Cambiar</span>
            </div>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleAvatarChange}
            accept="image/*"
            style={{ display: 'none' }}
          />
        </div>
        
        <div className='user-name-section'>
          <div 
            className='name-container'
            onMouseEnter={() => !isEditingName && setIsHoveringName(true)}
            onMouseLeave={() => !isEditingName && setIsHoveringName(false)}
          >
            {isEditingName ? (
              <div className='name-edit-container'>
                <input
                  ref={nameInputRef}
                  type='text'
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  onKeyDown={handleNameKeyDown}
                  onBlur={saveName}
                  className='name-edit-input'
                />
                <div className='name-edit-actions'>
                  <button 
                    className='name-action-btn confirm'
                    onClick={saveName}
                    title='Guardar'
                  >
                    <FontAwesomeIcon icon={faCheck} />
                  </button>
                  <button 
                    className='name-action-btn cancel'
                    onClick={cancelEditName}
                    title='Cancelar'
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h2 className='user-display-name'>{userData.name}</h2>
                {isHoveringName && (
                  <button 
                    className='edit-name-btn'
                    onClick={startEditingName}
                    title='Editar nombre'
                  >
                    <FontAwesomeIcon icon={faPen} />
                  </button>
                )}
              </>
            )}
          </div>
          <p className='user-email-display'>{userData.email}</p>
        </div>
      </div>

      <div className='compact-form'>
        <div className='form-row'>          
          <div className='form-field compact'>
            <label>Email</label>
            <input
              type='email'
              name='email'
              value={userData.email}
              readOnly
              disabled
              className='readonly-input'
            />
            <small className='email-note'>El email no se puede cambiar</small>
          </div>
        </div>

        <div className='form-field compact'>
          <label><span className='toolkit'>Autoguardado cada:<p className='extra-info'>Intervalo de tiempo en el que el progreso de tú proyecto se guarda de manera automática. <span>(No implementado)</span></p></span></label>
          
          <div className='radio-group'>
            <label className='radio-label'>
              <input
                type='radio'
                name='autoSave'
                value='30s'
                checked={userData.autoSave === '30s'}
                onChange={handleChange}
              />
              <div className='radio-content'>
                <span className='radio-title'>30 segundos</span>
                <span className='radio-description'>(máxima protección)</span>
              </div>
            </label>
            
            <label className='radio-label'>
              <input
                type='radio'
                name='autoSave'
                value='2min'
                checked={userData.autoSave === '2min' || !userData.autoSave}
                onChange={handleChange}
              />
              <div className='radio-content'>
                <span className='radio-title'>2 minutos</span>
                <span className='radio-description'>(recomendado)</span>
              </div>
            </label>
            
            <label className='radio-label'>
              <input
                type='radio'
                name='autoSave'
                value='5min'
                checked={userData.autoSave === '5min'}
                onChange={handleChange}
              />
              <div className='radio-content'>
                <span className='radio-title'>5 minutos</span>
                <span className='radio-description'>(equilibrado)</span>
              </div>
            </label>
            
            <label className='radio-label'>
              <input
                type='radio'
                name='autoSave'
                value='manual'
                checked={userData.autoSave === 'manual'}
                onChange={handleChange}
              />
              <div className='radio-content'>
                <span className='radio-title'>Manual</span>
                <span className='radio-description'>(sólo con Ctrl+S)</span>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserSettings