import React from 'react'
import styles from './style.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';

import { IoReturnUpBackOutline } from "react-icons/io5";
import { Outlet } from 'react-router-dom';


export default function ButtonBack() {

  const navigate = useNavigate();

  const location = useLocation();
  const handeOnClick = () => {
    let path = (location.pathname);
    console.log(path);

    if (path === '/JoinGame' || path === '/settings') {
      navigate('/Menu')
      return
    }

    if (path === '/Waiting' || path === '/ChoosePlayer' || path === '/PendingGame') {
      navigate('/JoinGame')
      return
    }

  }


  return (
    <>
      <button className={styles.ButtonBack} onClick={handeOnClick}>
        <IoReturnUpBackOutline />
      </button>
      <Outlet />
    </>
  )
}
