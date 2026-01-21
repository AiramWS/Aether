import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

type ButtonProps = {
  buttonId?: string
  buttonText: string
  icon: IconDefinition
  onClick?: () => void
}

const HomeButton = (props: ButtonProps) => {
    return (
      <button className='home-button' id={props.buttonId} onClick={props.onClick}>
        <FontAwesomeIcon icon={props.icon} className='button-icon'/>
        <p>{props.buttonText}</p>
      </button>
    )
}

export default HomeButton