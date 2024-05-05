import React from 'react'
import styles from './styles.module.scss'
export default function WhiteWrapperBox({ children, title = '', style = {} }) {

    return (
        <div className={styles.wrapperContainer} style={{ ...style }}>
            {title ? <h1>{title}</h1> : ''}
            {children}
        </div>
    )
}
