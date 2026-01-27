import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Sign.css';
import aetherIcon from '../../assets/appIcon.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { faCheckDouble } from '@fortawesome/free-solid-svg-icons';
import { supabase } from '../../lib/supabase';

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

const Sign = (props: Props) => {
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [validatePassowrd, setValidatePassword] = useState('');
    const [isMoved, setIsMoved] = useState(false);
    const [isDiasbled, setIsDiasbled] = useState(false)

    const navigate = useNavigate();

    const handleOpenMainWindow = () => {
        if (window.electronAPI) {
            window.electronAPI.openMainWindow();
        } else {
            navigate('/homepage');
        }
    };

    async function sleep(ms: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, ms))
    }

    async function toggleCover() {
        setIsMoved(!isMoved);

        await sleep(500);
        setIsDiasbled(!isDiasbled);
        setLoginEmail('');
        setRegisterEmail('');
        setLoginPassword('');
        setRegisterPassword('');
        setValidatePassword('');
    }

    const handleSignIn = async () => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: loginEmail,
                password: loginPassword
            })

            if (error) throw error
            
            handleOpenMainWindow();

        } catch (error: any) {
            alert('Error de login: ' + error.message);
        }
    }

    const SignIn = () => {
        return (
            <>
                <div className='text-section'>
                    <h1><span>Inicia</span> sesión</h1>
                </div>
                <div className='input-section'>
                    <div className='label-input'>
                        <label htmlFor='sign-in-email' className='input-label'>E-mail: </label>
                        <div className='icon-input'>
                            <FontAwesomeIcon icon={faEnvelope} />
                            <input
                                type='email'
                                id='sign-in-email'
                                value={loginEmail}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setLoginEmail(e.target.value)
                                }
                                placeholder='tuCorreo@email.com'
                                disabled={isDiasbled}
                                className='text-input'
                            />
                        </div>
                    </div>
                    <div className='label-input'>
                        <label htmlFor='login-password' className='input-label'>Contraseña: </label>
                        <div className='icon-input'>
                            <FontAwesomeIcon icon={faKey} />
                            <input
                                type='password'
                                id='login-password'
                                name='login-password'
                                value={loginPassword}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setLoginPassword(e.target.value)
                                }
                                placeholder='••••••••••••••'
                                disabled={isDiasbled}
                                className='text-input'
                            />
                        </div>
                    </div>
                </div>
                <div className='buttons-section'>
                    <button onClick={handleSignIn} className='sign-button' id='sign-up' disabled={isDiasbled}>
                        Entra
                    </button>
                    <button onClick={toggleCover} className='sign-button' id='login' disabled={isDiasbled}>
                        ¿Quieres crear una cuenta?
                    </button>
                </div>
            </>
        )
    }

    const handleSignUp = async () => {
        if (registerPassword !== validatePassowrd) {
            alert('Las contraseñas no coinciden');
            return
        }
        try {
            const { data, error } = await supabase.auth.signUp({
                email: registerEmail,
                password: registerPassword
            })

            if (error) throw error

            alert('Registrado');

        } catch (error: any) {
            alert('error: ' + error.message);
        }
    }

    const SignUp = () => {
        return (
            <>
                <div className='text-section'>
                    <h1>Registro</h1>
                </div>
                <div className='input-section'>
                    <div className='label-input'>
                        <label htmlFor='sign-up-email' className='input-label'>E-mail: </label>
                        <div className='icon-input'>
                            <FontAwesomeIcon icon={faEnvelope} />
                            <input
                                type='email'
                                id='sign-up-email'
                                value={registerEmail}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setRegisterEmail(e.target.value)
                                }
                                placeholder='tucorreo@email.com'
                                disabled={!isDiasbled}
                                className='text-input'
                            />
                        </div>
                    </div>
                    <div className='label-input'>
                        <label htmlFor='register-password' className='input-label'>Contraseña: </label>
                        <div className='icon-input'>
                            <FontAwesomeIcon icon={faKey} />
                            <input
                                type='password'
                                id='register-password'
                                name='register-password'
                                value={registerPassword}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setRegisterPassword(e.target.value)
                                }
                                placeholder='••••••••••••••'
                                disabled={!isDiasbled}
                                className='text-input'
                            />
                        </div>
                    </div>
                    <div className='label-input'>
                        <label htmlFor='validate-password' className='input-label'>Confirmar contraseña: </label>
                        <div className='icon-input'>
                            <FontAwesomeIcon icon={faCheckDouble} />
                            <input
                                type='password'
                                id='validate-password'
                                name='validate-password'
                                value={validatePassowrd}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setValidatePassword(e.target.value)
                                }
                                placeholder='••••••••••••••'
                                disabled={!isDiasbled}
                                className='text-input'
                            />
                        </div>
                    </div>
                </div>
                <div className='buttons-section'>
                    <button onClick={handleSignUp} className='sign-button' id='sign-up' disabled={!isDiasbled}>
                        Registrate
                    </button>
                    <button onClick={toggleCover} className='sign-button' id='login' disabled={!isDiasbled}>
                        ¿Ya tienes una cuenta?
                    </button>
                </div>
            </>
        )
    }

    return (
        <div className='sign-container'>
            <div className='sign-form'>
                {SignIn()}
            </div>
            <div className='sign-form'>
                {SignUp()}
            </div>
            <div
                className='sign-cover'
                style={{
                    transform: isMoved ? 'translateX(-94%)' : 'translateX(0)',
                    transition: 'transform 0.3s ease'
                }}
            >
                <h1>A<span>e</span>TH<span>e</span>R</h1>
                <div className='icon-container'>
                    <img src={aetherIcon} />
                </div>
                {
                    isMoved ? <h2>¡Bienvenido! ¿Estás listo para <span>crear</span>?</h2> : <h2>¡Me alegra verte!</h2>
                }
                <button className='help-button' onClick={window.electronAPI?.openHelpWindow}>?</button>
            </div>
        </div>
    )
}

export default Sign