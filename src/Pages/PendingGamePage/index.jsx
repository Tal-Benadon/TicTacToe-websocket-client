import React, { useEffect, useState } from 'react'
import styles from './style.module.scss'
import Loading from '../../componnents/Loading'
import { useBoardStore, useSocketStore, useTurnStore } from '../../store'
import { useNavigate } from 'react-router-dom'
import X from '../../componnents/X'
import O from '../../componnents/O'
import Title from '../../componnents/Title'
import Button from '../../componnents/Button'
export default function PendingGamePage() {
    const socket = useSocketStore((state) => state.socket)
    const { mySymbol, setMySymbol, setUserTurn, setUserInfo, setOpponentInfo } = useTurnStore()
    const [isPressed, setIsPressed] = useState(false)
    const setGameBoard = useBoardStore((state) => state.setGameBoard)

    const navigate = useNavigate()
    useEffect(() => {
        socket.on("sides-chosen", (data) => {
            if (data.complete) {

                setMySymbol(data.opponentSymbol)
            }
        })
        socket.on("create-board", (data) => {
            const newGameBoard = data.gameBoard
            let initialTurn = data.initialTurn
            setUserTurn(initialTurn)
            console.log(newGameBoard);
            setGameBoard(newGameBoard)
            let thisUser = data.roomUsers.find(user => user.userId === socket.id)
            let opponentUser = data.roomUsers.find(user => user.userId !== socket.id)
            setUserInfo(thisUser)
            setOpponentInfo(opponentUser)
            navigate('/GameBoard')
        })
    }, [socket])

    const handleReadyClick = () => {
        setIsPressed(!isPressed)
        socket.emit('player2Ready', { success: true })
    }

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
                }
                <Button text={`${isPressed ? "Loading..." : "I'M READY!"}`} onClick={handleReadyClick}
                    style={{
                        width: 'fit-content',
                        padding: '0 2rem',
                        pointerEvents: isPressed ? 'none' : 'auto'
                    }} />
            </div>
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




