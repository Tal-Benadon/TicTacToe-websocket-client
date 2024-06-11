import React, { useEffect } from 'react'
import styles from './style.module.scss';
import { useNavigate } from 'react-router-dom';



export default function Button({ text = "", style = {}, onClick, type = 'button', disabled }) {


  return (
    <>
      <button type={type} className={styles.Button} style={{ ...style }} onClick={onClick} disabled={disabled}>
        {text}
      </button>
    </>
  )
}
