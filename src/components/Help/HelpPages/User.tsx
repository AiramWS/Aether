import './HelpPages.css';
import Configuracion from '../../../assets/Help/ConfImagen.png';
import Imagen from '../../../assets/Help/User.png';
import Username from '../../../assets/Help/Username.png';
import Autoguardado from '../../../assets/Help/Autoguardado.png';

const User = () => {
  return (
    <div>
        <p style={{paddingTop: '700px'}}>
            En el apartado de configuración de usuario podremos ver y actualizar varios datos sobre nuestra cuenta, además de guardar las preferencias de autoguardado. En primer
            encontrará una imagen de usuario, su nombre y el correo vinculado a la cuenta. Para realizar cambios en estos datos pasaremos el ratón por encima y le haremos clic al
            elemento que busquemos cambiar —salvo el correo electrónico, que no permite cambios—. Para cambiar la foto de perfil se nos abrirá el navegador de archivos de nuestro
            sistema y seleccionaremos una imagen guardada en nuestro dispositivo.
        </p>    
        <div className='image-container'>
            <img src={Configuracion}/>
            <img src={Imagen}/>
        </div>
        <p>
            Para cambiar el nombre de usuario haremos clic en nuestro propio nombre de usuario, o al pasar el ratón por encima hacer clic en el nuevo botón con el icono de un lapiz.
            Tras esto, podrá poner el nombre que quiera y guardarlo dándole al tick o cancelar los cambios dándole a la cruz. Estos dos cambios serán persistentes entre sesión, así que
            solo habrá que cambiarlo una vez. Para asegurarse de que los cambios están guardados le daremos al botón ubicado en la parte superior derecha.
        </p>
        <div className='image-container'>
            <img src={Username}/>
        </div>
        <p>
            Finalmente, podemos cambiar la configuración de autoguardado haciendo clic en uno de los botones en este apartado ubicado en la sección inferior. Podemos elegir entre 30 segundos,
            2 minutos —La opción recomendada—, 5 minutos o el modo manual, haciendo Ctrl+S. Recuerda darle al botón de 'Guardar' una vez haya terminado con su configuración. Esta configuración
            es únicamente visual y no tiene funcionalidad actualmente. Pensada para futuras actualizaciones.
        </p>
        <div className='image-container'>
            <img src={Autoguardado}/>
        </div>
    </div>
  )
}

export default User