import React from 'react'
import styles from './style.module.scss';


export default function Loading() {
  return (
    <div className={styles.dotSpinner}>
    <div className={styles.dotSpinner__dot}></div>
    <div className={styles.dotSpinner__dot}></div>
    <div className={styles.dotSpinner__dot}></div>
    <div className={styles.dotSpinner__dot}></div>
    <div className={styles.dotSpinner__dot}></div>
    <div className={styles.dotSpinner__dot}></div>
    <div className={styles.dotSpinner__dot}></div>
    <div className={styles.dotSpinner__dot}></div>
</div>
  )
}
