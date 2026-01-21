import React from 'react'
import Temas from '../../../assets/Help/Temas.png';
import TemasDos from '../../../assets/Help/Temas2.png';


type Props = {}

const Personalizacion = (props: Props) => {
  return (
    <div>
        <p>
            Este apartado muestra dos únicos botones para la selección de la apariencia de nuestra aplicación. Debajo de estos encontramos una leyenda de la paleta de colores que se
            espera ver tras haberlos seleccionado. Seleccionando el tema claro u oscuro es preferencia personal y esto se guarda localmente entre sesiones. Si usa la aplicación con la
            misma cuenta pero en distintos dispositivos esta selección deberá volver a hacerla.
        </p>
        <div className='image-container'>
            <img src={Temas}/>
            <img src={TemasDos}/>
        </div>
        <p>
            La opción seleccionada se verá resaltada por un borde y un tick en la esquina superior derecha.
        </p>
    </div>
  )
}

export default Personalizacion