import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import WhiteWrapperBox from '../../componnents/WhiteWrapperBox'
import { useBoardStore, useTurnStore } from '../../store'
import Button from '../../componnents/Button'
import SymbolButtonCopy from '../../componnents/SymbolButtonCopy'
import { useNavigate } from 'react-router-dom'
import BoardHeader from '../../componnents/boardHeader'
export default function GameBoardPageCopy() {
    const [turn, setTurn] = useState(false)
    const createGameBoard = useBoardStore((state) => state.createBoard)
    const gameBoard = useBoardStore((state) => state.gameBoard)
    const gameEnded = useBoardStore((state) => state.gameEnded)
    const winningLine = useBoardStore((state) => state.winningLine)
    const updateSymbol = useBoardStore((state) => state.updateSymbol)
    const checkBoard = useBoardStore((state) => state.checkBoard)
    const updateEndGameBoard = useBoardStore((state) => state.updateEndGameBoard)
    const resetGame = useBoardStore((state) => state.resetGame)
    const resetGameWinner = useBoardStore((state) => state.resetGameWinner)
    const iterations = useBoardStore((state) => state.iterations)



    useEffect(() => {

        createGameBoard()
    }, [])



    useEffect(() => {
        if (gameEnded) {
            gameBoard.forEach(row => {
                row.forEach(cell => {
                    if (!includesSubArray(winningLine, cell.location)) {
                        updateEndGameBoard(cell.location[0], cell.location[1])
                    }
                })
            })
        }
    }, [gameEnded])

    const onPlayAgainClick = () => {
        setTurn(false)
        resetGame()
        resetGameWinner()
        createGameBoard()
    }

    const includesSubArray = (mainArray, subArray) => {
        return mainArray.some(element =>
            Array.isArray(element) &&
            element.length === subArray.length &&
            element.every((value, index) => value === subArray[index])
        );
    }

    const handleOnButtonClick = (location) => {
        if (gameEnded) {
            return
        }
        if (!turn) {
            updateSymbol(location[0], location[1], 'X') // adds "isPlayed:true"
            checkBoard(location[0], location[1], 'X')

            setTurn(!turn)
        } else if (turn) {

            updateSymbol(location[0], location[1], 'O')// adds "isPlayed:true"
            checkBoard(location[0], location[1], 'O')
            setTurn(!turn)
        }

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
                                        <SymbolButtonCopy key={columnIndex}
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
                        <Button text={'PLAY AGAIN'} onClick={onPlayAgainClick} style={{
                            height: '60px',
                            width: '250px',
                            fontSize: '28px',
                        }} />
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
