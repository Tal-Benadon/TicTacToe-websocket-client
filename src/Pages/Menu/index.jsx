import React from 'react'
import styles from './style.module.scss';
import Button from '../../componnents/Button';
import { useNavigate } from 'react-router-dom';

export default function Menu() {

    const navigate = useNavigate()

    const onFriendClick = () => {
        navigate('/JoinGame')
    }

    return (
        <div className={styles.menuContainer}>
            <div className={styles.Menu}>
                <img src="620af74ff1676949d91804882a8c5bab.png" alt="" />
                <div className={styles.Buttons}>
                    <Button text='PLAY SOLO' />

                    <Button text='PLAY WITH FRIEND' onClick={onFriendClick} />
                </div>
            </div>
        </div>
    )
}
