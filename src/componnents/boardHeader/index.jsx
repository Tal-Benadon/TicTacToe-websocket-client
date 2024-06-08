import React from 'react'
import styles from './style.module.scss'
import defaultImg1 from '../../../public/default_man.png'
import defaultImg2 from '../../../public/default_woman.png'

export default function BoardHeader() {

    return (
        <div className={styles.headerContainer}>
            <div className={styles.imagesContainer}>
                <img className={styles.userImg1} src={defaultImg1} alt="player1 image" />
                <img className={styles.userImg2} src={defaultImg2} alt="player2 image" />
            </div>
        </div>

    )
}
