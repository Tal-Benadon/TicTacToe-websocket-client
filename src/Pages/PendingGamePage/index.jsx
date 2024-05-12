import React, { useEffect, useState } from 'react'
import styles from './style.module.scss'
import Loading from '../../componnents/Loading'
import { useBoardStore, useSocketStore } from '../../store'
import { useNavigate } from 'react-router-dom'
import X from '../../componnents/X'
import O from '../../componnents/O'
import Title from '../../componnents/Title'
export default function PendingGamePage() {
    const socket = useSocketStore((state) => state.socket)
    const setGameBoard = useBoardStore((state) => state.setGameBoard)
    const [chosenSymbol, setChosenSymbol] = useState('')

    const navigate = useNavigate()
    useEffect(() => {
        socket.on("sides-chosen", (data) => {
            if (data.complete) {
                setTimeout(() => {
                    navigate('/GameBoard')
                }, 2500);
                setChosenSymbol(data.opponentSymbol)
            }
        })
        socket.on("create-board", (data) => {
            const newGameBoard = data.gameBoard
            console.log(newGameBoard);
            setGameBoard(newGameBoard)
        })
    }, [socket])

    return (
        chosenSymbol ?
            <div className={styles.playerSideContainer}>
                <Title title={"YOU'RE PLAYING:"} />
                {chosenSymbol === 'X' ?

                    <div className={styles.chosenSymbol}>
                        <X />
                    </div>
                    :
                    <div className={styles.chosenSymbol}>
                        <O />
                    </div>
                }</div>
            :
            <div className={styles.pendingContainer}>
                <Loading />
                <div className={styles.titles}>
                    <h2>OPPONENT IS CHOOSING SIDES</h2>
                    <h2>WAITING...</h2>
                </div>
            </div>
    )
}




