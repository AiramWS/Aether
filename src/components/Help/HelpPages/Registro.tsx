import React from 'react'
import './HelpPages.css';
import Registro01 from '../../../assets/Help/Registro01.png';
import Registro02 from '../../../assets/Help/Registro02.png';

type Props = {
  goToLogin: () => void;
};

const Registro = ({ goToLogin }: Props) => {  return (
    <div>
        <p>
            Lo primero que verá al iniciar Aether será la ventana de inicio de sesión. Sin embargo, el primer paso para acceder a nuestra aplicación es crear una cuenta (En caso de no tenerla).
            Para ello hará clic en el botón que se lee '¿Quieres crear una cuenta?', ubicado en la parte inferior. Eso desplazará el panel de bienvenida, revelando el formulario de registro. Puede interactuar con los distintos
            elementos de dicho formulario pulsando el tabulador o haciendo clic directamente en ellos.  Deberá ingresar un correo electrónico válido, además de ingresar la misma contraseña
            —con mínimo seis carácteres—  dos veces para verificar que no se ha equivocado al escribirla.
        </p>
        <div className='image-container'>
          <img src={Registro01}/>
          <img src={Registro02}/>
        </div>
        <p>
          Una vez ingresado los datos en el formulario de registro podremos hacer clic en el botón de 'Registrate' y si los datos son correctos se mostrará una alerta indicando que la cuenta
          se ha guardado correctamente. Tras eso podremos continuar con el <button className='text-button' type='button' onClick={goToLogin}>inicio de sesión.</button>
        </p>
        <p>
          Un error a destacar que está todavía por ser corregido es que, cuando sale una alerta es posible que las cajas de texto dejen de funcionar. Esto se soluciona reiniciando la aplicación.
          En futuras actualizaciones este error será corregido.
        </p>
    </div>
  )
}

export default Registro