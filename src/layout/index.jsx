import React from 'react'
import styles from './style.module.scss';
import { Outlet } from "react-router-dom";


export default function index() {
  return (
    <div className={styles.Layout}>
     <Outlet/>
    </div>
  )
}
