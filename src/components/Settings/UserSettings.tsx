import React, { useState, useRef, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import './UserSettings.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faPen, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useUsuario } from '../../context/UsuarioContext';

const UserSettings = () => {
  const { usuario, setUsuario } = useUsuario();
  const [avatar, setAvatar] = useState<string>(usuario.avatar || '');
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(usuario.nombre);
  const [isHoveringName, setIsHoveringName] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  // Obtener datos del usuario desde Supabase y localStorage al iniciar
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (user && user.email) {
        const savedData = localStorage.getItem('aether-user-settings');
        if (savedData) {
          const parsedData = JSON.parse(savedData);
          setUsuario(prev => ({
            ...prev,
            nombre: parsedData.nombre || user.user_metadata?.nombre || 'Usuario',
            email: user.email || 'usuario@aether.com',
            idioma: parsedData.idioma || 'Español',
            avatar: parsedData.avatar || ''
          }));
          setAvatar(parsedData.avatar || '');
          setTempName(parsedData.nombre || user.user_metadata?.nombre || 'Usuario');
        } else {
          setUsuario(prev => ({
            ...prev,
            nombre: user.user_metadata?.nombre || 'Usuario',
            email: user.email || 'usuario@aether.com',
            idioma: 'Español'
          }));
          setTempName(user.user_metadata?.nombre || 'Usuario');
        }
      }
    };

    getUser();
  }, [setUsuario]);

  // Mantener tempName sincronizado con usuario.name
  useEffect(() => {
    setTempName(usuario.nombre);
  }, [usuario.nombre]);

  // Focus al editar nombre
  useEffect(() => {
    if (isEditingName && nameInputRef.current) {
      nameInputRef.current.focus();
      nameInputRef.current.select();
    }
  }, [isEditingName]);

  // Cambios en inputs / textarea / select
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUsuario(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Avatar
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert('La imagen es demasiado grande. Máximo 2MB.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setAvatar(base64String);
      setUsuario(prev => ({
        ...prev,
        avatar: base64String
      }));
    };
    reader.readAsDataURL(file);
  };

  const removeAvatar = () => {
    setAvatar('');
    setUsuario(prev => ({ ...prev, avatar: '' }));
  };

  // Edición de nombre
  const startEditingName = () => {
    setTempName(usuario.nombre);
    setIsEditingName(true);
  };

  const saveName = () => {
    if (tempName.trim() !== '' && tempName !== usuario.nombre) {
      setUsuario(prev => ({
        ...prev,
        nombre: tempName.trim()
      }));
    }
    setIsEditingName(false);
    setIsHoveringName(false);
  };

  const cancelEditName = () => {
    setTempName(usuario.nombre);
    setIsEditingName(false);
    setIsHoveringName(false);
  };

  const handleNameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') saveName();
    else if (e.key === 'Escape') cancelEditName();
  };

  // Guardar cambios en localStorage
  const saveChanges = () => {
    try {
      localStorage.setItem('aether-user-settings', JSON.stringify(usuario));

      const saveBtn = document.querySelector('.save-btn-small') as HTMLButtonElement;
      if (saveBtn) {
        const originalText = saveBtn.textContent;
        saveBtn.textContent = '✓ Guardado';
        saveBtn.style.backgroundColor = 'var(--color-secondary)';

        setTimeout(() => {
          saveBtn.textContent = originalText;
          saveBtn.style.backgroundColor = '';
        }, 2000);
      }
    } catch (error) {
      console.error('Error guardando datos:', error);
    }
  };

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

      <div className='compact-divider' />

      <div className='user-profile-header'>
        <div className='avatar-container' onClick={handleAvatarClick}>
          <div className='avatar-wrapper'>
            {avatar ? (
              <img src={avatar} alt="Avatar" className='avatar-image' />
            ) : (
              <div className='avatar-placeholder'>
                {usuario.nombre.charAt(0).toUpperCase()}
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
                <h2 className='user-display-name'>{usuario.nombre}</h2>
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
          <p className='user-email-display'>{usuario.email}</p>
        </div>
      </div>

      <div className='compact-form'>
        <div className='form-row'>
          <div className='form-field compact'>
            <label>Email</label>
            <input
              type='email'
              name='email'
              value={usuario.email}
              readOnly
              disabled
              className='readonly-input'
            />
            <small className='email-note'>El email no se puede cambiar</small>
          </div>
        </div>

        <div className='form-field compact'>
          <label>
            <span className='toolkit'>
              Autoguardado cada:
              <p className='extra-info'>
                Intervalo de tiempo en el que el progreso de tú proyecto se guarda de manera automática. <span>(No implementado)</span>
              </p>
            </span>
          </label>

          <div className='radio-group'>
            <label className='radio-label'>
              <input
                type='radio'
                name='autoSave'
                value='30s'
                checked={usuario.autoGuardado === '30s'}
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
                checked={usuario.autoGuardado === '2min' || !usuario.autoGuardado}
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
                checked={usuario.autoGuardado === '5min'}
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
                checked={usuario.autoGuardado === 'manual'}
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
  );
};

export default UserSettings;
