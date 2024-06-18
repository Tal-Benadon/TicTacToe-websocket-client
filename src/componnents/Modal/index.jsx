import React from 'react'
import styles from './styles.module.scss'
export default function Modal({ show, onClose, children }) {

    if (!show) {
        return null
    }

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContainer}>
                <button onClick={onClose} className={styles.button}>x</button>
                {children}
            </div>
        </div >
    )
}
