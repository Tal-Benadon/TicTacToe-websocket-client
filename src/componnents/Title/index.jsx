import React from 'react'
import styles from './styles.module.scss'
export default function Title({ title = '', style = {} }) {
    return (
        <h2 className={styles.title} style={{ ...style }}>{title}</h2>
    )
}
