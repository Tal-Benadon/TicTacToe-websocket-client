import React from 'react'
import styles from './style.module.scss';


export default function Button({text="PLAY SOLO"}) {
  return (
  <>
  <button className={styles.Button}>
   {text}
  </button>
  </>
  )
}
