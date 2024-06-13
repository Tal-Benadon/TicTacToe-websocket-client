import React from 'react'
import styles from './style.module.scss';


export default function InputCode({ value, onChange, placeholder, maxlength, title, classname }) {
  return (
    <div className={styles.inputContainer}>
      {title ? <h2 className={styles.title}>{title}</h2> : ""}
      <input className={`${styles.InpotCode} ${classname}`} type="text" value={value} onChange={onChange} placeholder={placeholder} maxLength={maxlength} />
    </div>

  )
}
