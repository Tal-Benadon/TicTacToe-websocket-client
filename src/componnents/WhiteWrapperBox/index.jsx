import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
export default function WhiteWrapperBox({ children, title = '', style = {} }) {

    const [newCod,setNewCod]=useState()

    useEffect(()=>{
    const randomCod = ()  => {
        setNewCod(Math.floor(100000 + Math.random() * 900000));   
      }   
      // לדוגמה:
      console.log(randomCod());
    },[])

    return (


        
        <div className={styles.wrapperContainer} style={{ ...style }}>
            {title ? <h2>{title}</h2> : ''}
            <div className={styles.cod}>
            {newCod }
            </div>
            {children}
        </div>
    )
}
