import React from 'react'
import styles from './style.module.scss';
import { Outlet } from "react-router-dom";


export default function Layout() {
  return (
    <div className={styles.appLayoutContainer}>
      <Outlet />
    </div>


  )
}
