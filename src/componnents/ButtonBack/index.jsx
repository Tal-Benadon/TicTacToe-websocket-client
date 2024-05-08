import React from 'react'
import styles from './style.module.scss';
import { useNavigate } from 'react-router-dom';

import { IoReturnUpBackOutline } from "react-icons/io5";
import { Outlet } from 'react-router-dom';


export default function ButtonBack() {

  const navigate = useNavigate();

  return (
    <>
      <button className={styles.ButtonBack} onClick={() => navigate(-1)}>
        <IoReturnUpBackOutline />
      </button>
      <Outlet />
    </>
  )
}
