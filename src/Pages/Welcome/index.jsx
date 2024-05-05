import React, { useEffect } from 'react'
import styles from './style.module.scss';
import { useNavigate } from 'react-router-dom';


export default function Welcome() {

  const nav = useNavigate()
  
  useEffect(()=>{
    setTimeout(()=>{nav('/Menu')},3000)
  },[])


  return (
    <div className={styles.Welcome}>  
    <img src="620af74ff1676949d91804882a8c5bab.png" alt="" />
    </div>

  )
}
