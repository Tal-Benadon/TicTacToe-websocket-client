import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import WhiteWrapperBox from '../../componnents/WhiteWrapperBox'
import { useBoardStore, useSocketStore, useTurnStore } from '../../store'
import Button from '../../componnents/Button'
import SymbolButton from '../../componnents/SymbolButton'
import { useNavigate } from 'react-router-dom'
import BoardHeader from '../../componnents/boardHeader'
export default function GameBoardPage() {
    // const [turn, setTurn] = useState(false)c
    const [isWaiting, setIsWaiting] = useState(false)
    const mySymbol = useTurnStore((state) => state.mySymbol)
    const userTurn = useTurnStore((state) => state.userTurn)
    const setUserTurn = useTurnStore((state) => state.setUserTurn)
    const createGameBoard = useBoardStore((state) => state.createBoard)
    const gameBoard = useBoardStore((state) => state.gameBoard)
    const gameEnded = useBoardStore((state) => state.gameEnded)
    const setGameEnded = useBoardStore((state) => state.setGameEnded)
    const updateSymbol = useBoardStore((state) => state.updateSymbol)
    const checkBoard = useBoardStore((state) => state.checkBoard)
    const resetGame = useBoardStore((state) => state.resetGame)
    const setGameWinner = useBoardStore((state) => state.setGameWinner)
    const resetGameWinner = useBoardStore((state) => state.resetGameWinner)
    const setGameBoard = useBoardStore((state) => state.setGameBoard)

    const socket = useSocketStore((state) => state.socket)

    console.log(gameBoard);


    useEffect(() => {
        socket.on("game-move", (data) => {
            let newGameBoard = data.gameBoard
            let newTurn = data.newTurn
            setGameBoard(newGameBoard)
            setUserTurn(newTurn)
        })

        socket.on("game-end", (data) => {
            setGameEnded(data.gameEnded)
            setGameWinner(data.gameWinner)
            if (data.gameBoard) {
                setGameBoard(data.gameBoard)
            }
        })

        socket.on("illegal-move", (data) => {
            if (data.illegal) {
                console.log(data.alert);
            }
        })

        socket.on("waiting-replay", (data) => {
            console.log(data.alert);

        })

        socket.on("playing-again", (data) => {
            console.log("hi", data.gameBoard);
            setGameBoard(data.gameBoard)
            setGameEnded(data.gameEnded)
            setIsWaiting(false)
            setUserTurn(data.currentTurn)
        })

    }, [socket])

    // useEffect(() => {


    // }, [socket])


    const onPlayAgainClick = () => {
        // setTurn(false)
        socket.emit("play-again")
        setIsWaiting(true)
    }





    const handleOnButtonClick = (location) => {
        if (gameEnded) {
            return
        }
        if (userTurn === socket.id) {
            let update = updateSymbol(location[0], location[1], mySymbol) // adds "isPlayed:true"
            console.log(update);
            socket.emit("game-move", { location, mySymbol })
            // checkBoard(location[0], location[1], 'X')

            // setTurn(!turn)
        } else {
            return
        } //if 
        // () {

        // updateSymbol(location[0], location[1], 'O')// adds "isPlayed:true"
        // checkBoard(location[0], location[1], 'O')
        // setTurn(!turn)
    }

    const getClassName = (symbol) => {
        const isActive = symbol ? styles.xActive : ''
        return `${styles.symbol} ${isActive}`
    }


    return (
        <div className={styles.boardContainer}>
            <div className={styles.headerContainer}>
                <BoardHeader />
            </div>
            <div className={styles.screenCntr}>
                <div style={{ width: '100%' }}>
                    <WhiteWrapperBox style={
                        {
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            padding: '16px',
                            gap: '5px',
                        }
                    }>
                        {gameBoard.map((row, rowIndex) => {
                            return <div key={rowIndex} className={styles.rowDiv}>
                                {row.map((cell, columnIndex) => {
                                    let location = [rowIndex, columnIndex]
                                    return (
                                        <SymbolButton key={columnIndex}
                                            symbol={cell.symbol}
                                            onClick={() => handleOnButtonClick(location)}
                                            isInactive={cell.isInactive}
                                            className={getClassName(cell.symbol)}
                                        />
                                    )
                                })}
                            </div>
                        })}
                    </WhiteWrapperBox>
                </div>
            </div>
            {
                gameEnded ?



                    <div className={styles.endBtns}>
                        {!isWaiting ?
                            <Button text={'PLAY AGAIN'} onClick={onPlayAgainClick} style={{
                                height: '60px',
                                width: '250px',
                                fontSize: '28px',
                            }} />

                            :
                            <Button text={'Waiting...'} style={{
                                height: '60px',
                                width: '250px',
                                fontSize: '28px',
                            }} />}
                        <Button text={'BACK TO MAIN'} style={{
                            height: '60px',
                            width: '250px',
                            fontSize: '28px',
                            whiteSpace: 'nowrap',
                            textAlign: 'center',
                            overflow: 'hidden'

                        }} />
                    </div>
                    :
                    <div className={styles.btn}>
                        <Button text={'BACK'} style={{
                            height: '85px',
                            width: 'fit-content',
                            padding: '0px 5rem',
                            fontSize: '28px',
                        }} />
                    </div>

            }

        </div>
    )
}
