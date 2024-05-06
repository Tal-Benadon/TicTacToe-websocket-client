import React from 'react'
import styles from './style.module.scss';
import Button from '../../componnents/Button';

export default function Menu() {
    return (
        <div className={styles.menuContainer}>
            <div className={styles.Menu}>
                <img src="620af74ff1676949d91804882a8c5bab.png" alt="" />
                <div className={styles.Buttons}>
                    <Button text='PLAY SOLO' />

                    <Button text='PLAY WITH FRIEND' Navigate={'/JoinGame'} />
                </div>
            </div>
        </div>
    )
}
