import React, { useEffect } from 'react'
import styles from './style.module.scss'
import defaultImg1 from '../../../public/default_man.png'
import defaultImg2 from '../../../public/default_woman.png'

import { useBoardStore, useTurnStore } from '../../store'
import X from '../X'
import O from '../O'

export default function BoardHeader() {
    const { gameWinner } = useBoardStore()
    const { userInfo, opponentInfo } = useTurnStore()


    console.log(gameWinner);
    console.log({ userInfo });
    const symbols = { 'X': <X />, 'O': <O /> }



    // const userName = localStorage.getItem('ticTacToeUserName')
    return (
        <div className={styles.headerContainer}>
            <div className={styles.imagesContainer}>
                <div className={styles.userInfo}>
                    <img className={styles.userImg1} src={defaultImg1} alt="player1 image" />
                    <div className={styles.wins}>Wins: {userInfo.wins}
                        <div className={styles.playerSymbol}>
                            {symbols[userInfo.symbol]}
                        </div>
                    </div>
                    <h2 className={styles.userName}>{userInfo.displayName}</h2>
                </div>

                <div className={styles.userInfo}>
                    <img className={styles.userImg2} src={defaultImg2} alt="player2 image" />
                    <div className={styles.wins}>Wins: {opponentInfo.wins}
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
