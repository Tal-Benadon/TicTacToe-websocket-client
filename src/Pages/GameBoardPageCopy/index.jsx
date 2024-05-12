import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import WhiteWrapperBox from '../../componnents/WhiteWrapperBox'
import { useBoardStore, useSocketStore, useTurnStore } from '../../store'
import Button from '../../componnents/Button'
import SymbolButtonCopy from '../../componnents/SymbolButtonCopy'
import { useNavigate } from 'react-router-dom'
import BoardHeader from '../../componnents/boardHeader'
export default function GameBoardPageCopy() {
    const [turn, setTurn] = useState(false)
    const createGameBoard = useBoardStore((state) => state.createBoard)
    const gameBoard = useBoardStore((state) => state.gameBoard)
    const gameEnded = useBoardStore((state) => state.gameEnded)
    const updateSymbol = useBoardStore((state) => state.updateSymbol)
    const checkBoard = useBoardStore((state) => state.checkBoard)
    const resetGame = useBoardStore((state) => state.resetGame)
    const resetGameWinner = useBoardStore((state) => state.resetGameWinner)
    const socket = useSocketStore((state) => state.socket)



    useEffect(() => {

        createGameBoard()
    }, [])

    // useEffect(() => {


    // }, [socket])


    const onPlayAgainClick = () => {
        setTurn(false)
        resetGame()
        resetGameWinner()
        createGameBoard()
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
