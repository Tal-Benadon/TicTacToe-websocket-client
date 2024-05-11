import React from 'react'
import styles from './style.module.scss';


export default function InputCode({ value, onChange, placeholder, maxlength }) {
  return (
    <>
      <input className={styles.InpotCod} type="text" value={value} onChange={onChange} placeholder={placeholder} maxLength={maxlength} />
    </>
  )
}
