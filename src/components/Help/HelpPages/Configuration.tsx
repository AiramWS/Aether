import './HelpPages.css';
import ConfButton from '../../../assets/Help/ConfButton.png';
import Configuracion from '../../../assets/Help/Configuracion.png';


type Props = {
  goToUser: () => void;
  goToThemes: () => void;
  goToAcces: () => void;
};

const Configuration = (props: Props) => {
  return (
    <div>
        <p>
            Aether es una aplicación que aspira a ser altamente configurable. Para poder acceder a todas sus funciones de configuración deberá haber iniciado sesión y haber accedido a
            la aplicación. Ahí en la zona inferior izquierda encontraremos un botón con un icono de engranaje que muestra un texto 'Configuración'.  Esto abrirá un nuevo panel por encima de la
            principal. Lo podemos cerrar haciendo clic fuera de esa nueva vista, en la zona que se ha oscurecido.
        </p>
        <div className='image-container'>
            <img src={ConfButton}/>
            <img src={Configuracion}/>
        </div>
        <p>
            Por defecto se nos habrá abierto la configuración del <button className='text-button' onClick={props.goToUser}>usuario</button>, pero en el panel izquierdo podremos también acceder a la configuración de
            {" "}<button className='text-button' onClick={props.goToThemes}>personalización</button> y <button className='text-button' onClick={props.goToAcces}>accesibilidad</button>'.
        </p>
    </div>
  )
}

export default Configuration