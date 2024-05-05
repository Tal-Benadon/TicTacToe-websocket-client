import React from 'react'
import styles from './styles.module.scss'
export default function WhiteWrapperBox({ children, style = {} }) {
    return (
        <div className={styles.wrapperContainer} style={{ ...style }}>
            {children}
        </div>
    )
}
