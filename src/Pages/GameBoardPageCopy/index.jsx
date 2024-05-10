import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import WhiteWrapperBox from '../../componnents/WhiteWrapperBox'
// import SymbolButton from '../../componnents/SymbolButton'
import { useBoardStore, useTurnStore } from '../../store'
import Button from '../../componnents/Button'
import SymbolButtonCopy from '../../componnents/SymbolButtonCopy'
import { useNavigate } from 'react-router-dom'
export default function GameBoardPageCopy() {
    const [turn, setTurn] = useState(false)
    const navigate = useNavigate()
    const createGameBoard = useBoardStore((state) => state.createBoard)
    const gameBoard = useBoardStore((state) => state.gameBoard)
    const gameEnded = useBoardStore((state) => state.gameEnded)
    const winningLine = useBoardStore((state) => state.winningLine)
    const updateSymbol = useBoardStore((state) => state.updateSymbol)
    const checkBoard = useBoardStore((state) => state.checkBoard)
    const updateEndGameBoard = useBoardStore((state) => state.updateEndGameBoard)
    const resetGame = useBoardStore((state) => state.resetGame)
    const resetGameWinner = useBoardStore((state) => state.resetGameWinner)
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
        // console.log(symbol);
        const isActive = symbol ? styles.xActive : ''
        // console.log(`${styles.symbol} ${isActive}`);
        return `${styles.symbol} ${isActive}`
    }


    return (
        <div className={styles.boardContainer}>
            <div>
                <h2 style={{ fontSize: '40px' }}>Header </h2>
            </div>
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

            <Button text={'back'} Navigate={'/Menu'} style={{
                height: '85px',
                width: 'fit-content',
                padding: '0px 5rem',
                fontSize: '28px',
            }} />

        </div>
    )
}
