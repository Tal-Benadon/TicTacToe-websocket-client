import React from 'react';
import styles from './style.module.scss';
import { useNavigate } from 'react-router-dom';
import { useGameMode } from '../../store';

export default function Button({ text = "PLAY SOLO", Navigate, style = {} }) {
  const solo = useGameMode((state)=>state.solo )
  const setSolo = useGameMode((state) => state.setSolo);
  const withFriends = useGameMode((state)=>state.withFriends )
  const setWithFriends = useGameMode((state) => state.setWithFriends);
  const nav = useNavigate();

  const handelNav = () => {
    nav(Navigate);
  };

  const handelChose = () => {
    if (text === "PLAY SOLO") {
      setSolo(true);
    } else {
      setWithFriends(true);
    }
  };
  
  const handleClick = () => {
    handelNav();
    handelChose();
  };

  return (
    <button className={styles.Button} style={{ ...style }} onClick={handleClick}>
      {text}
    </button>
  );
}
