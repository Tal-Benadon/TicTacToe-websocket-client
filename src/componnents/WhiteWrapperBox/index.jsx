import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
export default function WhiteWrapperBox({ children, title = '', style = {} }) {



    return (



        <div className={styles.wrapperContainer} style={{ ...style }}>
            {title ? <h2>{title}</h2> : ''}
            {children}
        </div>
    )
}
