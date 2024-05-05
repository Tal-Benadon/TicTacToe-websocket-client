import React, { useState } from 'react'
import styles from './styles.module.scss'
export default function SymbolButton() {
    const [active, setActive] = useState(true)
    return (
        <button className={active ? `${styles.buttonContainer}` : `${styles.buttonContainer} ${styles.active}`} onClick={() => setActive(!active)}>

        </button>
    )

}
