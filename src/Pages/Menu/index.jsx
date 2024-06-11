import React from 'react'
import styles from './style.module.scss';
import Button from '../../componnents/Button';
import { useNavigate } from 'react-router-dom';
import { HiOutlineCog8Tooth } from "react-icons/hi2";
export default function Menu() {

    const navigate = useNavigate()

    const onFriendClick = () => {
        navigate('/JoinGame')
    }

    const onSettingsClick = () => {
        navigate('/settings')
    }

    return (
        <div className={styles.Menu}>
            <img src="620af74ff1676949d91804882a8c5bab.png" alt="" />
            <div className={styles.Buttons}>
                <Button text='PLAY SOLO' />

                <Button text='PLAY WITH FRIEND' onClick={onFriendClick} />
            </div>
            <Button onClick={onSettingsClick} text={<HiOutlineCog8Tooth className={styles.settingsCog} />} style={{
                position: 'absolute',
                bottom: '0',
                right: '0',
                display: 'flex',
                margin: '0 1rem 1rem 0',
                padding: '8px',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '7px',
                width: 'fit-content'
            }} />
        </div>
    )
}
