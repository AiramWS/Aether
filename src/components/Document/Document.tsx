import React from 'react'
import './Document.css'
import { useNavigate } from 'react-router-dom';


type Props = {}

const Document = (props: Props) => {
    const navigate = useNavigate();

  return (
    <>
      <button onClick={() => navigate('/homepage')} className='back-button'/>
      <div className='paper'/>
    </>
  )
}

export default Document