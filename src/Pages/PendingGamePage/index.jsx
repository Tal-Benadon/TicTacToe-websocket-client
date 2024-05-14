import React, { useEffect, useState } from 'react'
import styles from './style.module.scss'
import Loading from '../../componnents/Loading'
import { useBoardStore, useSocketStore, useTurnStore } from '../../store'
import { useNavigate } from 'react-router-dom'
import X from '../../componnents/X'
import O from '../../componnents/O'
import Title from '../../componnents/Title'
export default function PendingGamePage() {
    const socket = useSocketStore((state) => state.socket)
    const setMySymbol = useTurnStore((state) => state.setMySymbol)
    const mySymbol = useTurnStore((state) => state.mySymbol)
    const setGameBoard = useBoardStore((state) => state.setGameBoard)
    const setUserTurn = useTurnStore((state) => state.setUserTurn)
    // const [chosenSymbol, setChosenSymbol] = useState('')

    const navigate = useNavigate()
    useEffect(() => {
        socket.on("sides-chosen", (data) => {
            if (data.complete) {

                setTimeout(() => {
                    navigate('/GameBoard')
                }, 2500);
                setMySymbol(data.opponentSymbol)
            }
        })
        socket.on("create-board", (data) => {
            const newGameBoard = data.gameBoard
            let initialTurn = data.initialTurn
            setUserTurn(initialTurn)
            console.log(newGameBoard);
            setGameBoard(newGameBoard)
        })
    }, [socket])

    return (
        mySymbol ?
            <div className={styles.playerSideContainer}>
                <Title title={"YOU'RE PLAYING:"} />
                {mySymbol === 'X' ?

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




