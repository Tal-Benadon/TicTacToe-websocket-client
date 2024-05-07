import React, { useEffect } from 'react'
import styles from './style.module.scss';
import { useNavigate } from 'react-router-dom';



export default function Button({ text = "PLAY SOLO", Navigate, style = {} }) {

  const nav = useNavigate()
  const handelNav = () => {
    nav(Navigate)
  }
  return (
    <>
      <button className={styles.Button} style={{ ...style }} onClick={() => handelNav()}>
        {text}
      </button>
    </>
  )
}
