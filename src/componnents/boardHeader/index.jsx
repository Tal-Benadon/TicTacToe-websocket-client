import React, { useEffect } from 'react'
import styles from './style.module.scss'
import defaultImg1 from '../../../public/default_man.png'
import { images } from '../../data/imageList'
import { useBoardStore, useTurnStore } from '../../store'
import X from '../X'
import O from '../O'

export default function BoardHeader() {
    const { gameWinner } = useBoardStore()
    const { userInfo, opponentInfo } = useTurnStore()
    const userImg = images[userInfo.displayImageIndex]
    const opponentImg = images[opponentInfo.displayImageIndex]
    console.log(gameWinner);
    console.log({ userInfo });
    const symbols = { 'X': <X />, 'O': <O /> }




    return (
        <div className={styles.headerContainer}>
            <div className={styles.imagesContainer}>
                <div className={styles.userInfo}>
                    <img className={styles.userImg1} src={userImg ? userImg : defaultImg1} alt="player1 image" />
                    <div className={styles.wins}>Wins: <p className={styles.winNum}>{userInfo.wins}</p>
                        <div className={styles.playerSymbol}>
                            {symbols[userInfo.symbol]}
                        </div>
                    </div>
                    <h2 className={styles.userName}>{userInfo.displayName}</h2>
                </div>

                <div className={styles.userInfo}>
                    <img className={styles.userImg2} src={opponentImg ? opponentImg : defaultImg1} alt="player2 image" />
                    <div className={styles.wins}>Wins: <p className={styles.winNum}>{opponentInfo.wins}</p>
                        <div className={styles.playerSymbol}>
                            {symbols[opponentInfo.symbol]}
                        </div>
                    </div>
                    <h2 className={styles.userName}>{opponentInfo.displayName}</h2>
                </div>
            </div>
        </div>

    )
}
