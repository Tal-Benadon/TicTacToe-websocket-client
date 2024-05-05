import React from 'react'
import styles from './style.module.scss';

import { IoReturnUpBackOutline } from "react-icons/io5";


export default function ButtonBack() {
  return (
   <button className={styles.ButtonBack}>
  <IoReturnUpBackOutline />

   </button>
  )
}
