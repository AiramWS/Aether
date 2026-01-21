import React from 'react'
import './HelpPages.css';
import Registro from './Registro';
import Registro01 from '../../../assets/Help/Sesión.png';

type Props = {}

const InicioSesión = (props: Props) => {
  return (
    <div>
        <p>
            Para iniciar sesión tenemos que acceder a la pantalla de inicio de sesión. Para llegar a esta ventana podemos iniciar la aplicación; o en su defecto, si estamos en la ventana de Registro
            haremos clic en el botón que se lee como '¿Ya tienes cuenta?' para desplazar el panel de bienvenida y revelando el formulario de inicio de sesión. Una vez en la vista para el inicio de sesión
            podremos rellenar las caja sde texto con la información que agregamos en el registro. Si nuestros datos concuerdan con los encontrados en la base de datos podremos acceder a la aplicación.
        </p>
        <div className='image-container'>
            <img src={Registro01}/>
        </div>
    </div>
  )
}

export default InicioSesión