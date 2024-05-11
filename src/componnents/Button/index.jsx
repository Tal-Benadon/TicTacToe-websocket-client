import React, { useEffect } from 'react'
import styles from './style.module.scss';
import { useNavigate } from 'react-router-dom';



export default function Button({ text = "PLAY SOLO", style = {}, onClick, type = 'button' }) {


  return (
    <>
      <button type={type} className={styles.Button} style={{ ...style }} onClick={onClick}>
        {text}
      </button>
    </>
  )
}
