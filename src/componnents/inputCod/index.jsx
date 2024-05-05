import React from 'react'
import styles from './style.module.scss';


export default function InputCod() {
  return (
    <>
    <p>YOUR CODE</p>
    <input className={styles.InpotCod} type="text" placeholder = "enter code game"/>
    </>
  )
}
