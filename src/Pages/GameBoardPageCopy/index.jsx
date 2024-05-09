import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import WhiteWrapperBox from '../../componnents/WhiteWrapperBox'
// import SymbolButton from '../../componnents/SymbolButton'
import { useBoardStore, useTurnStore } from '../../store'
import Button from '../../componnents/Button'
import SymbolButtonCopy from '../../componnents/SymbolButtonCopy'
export default function GameBoardPageCopy() {
    const [turn, setTurn] = useState(false)
    const createGameBoard = useBoardStore((state) => state.createBoard)
    const gameBoard = useBoardStore((state) => state.gameBoard)
    const gameEnded = useBoardStore((state) => state.gameEnded)
    const updateSymbol = useBoardStore((state) => state.updateSymbol)
    const checkBoard = useBoardStore((state) => state.updateSymbol)
    // const setGameBoard = useBoardStore((state) => state.setGameBoard)
    useEffect(() => {
        createGameBoard()
    }, [])

    const handleOnButtonClick = (location) => {
        if (gameEnded) {
            return
        }
        if (!turn) {
            updateSymbol(location[0], location[1], 'X')
            checkBoard(location[0], location[1], 'X')
            setTurn(!turn)
        } else if (turn) {

            updateSymbol(location[0], location[1], 'O')
            checkBoard(location[0], location[1], 'O')
            setTurn(!turn)
        }

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
                                        isGameBoard={true}
                                        symbol={cell.symbol}
                                        isPlayed={cell.isPlayed}
                                        onClick={() => handleOnButtonClick(location)}
                                    />
                                )
                            })}
                        </div>
                    })}
                </WhiteWrapperBox>
            </div>

            <Button text={'back'} style={{
                height: '85px',
                width: 'fit-content',
                padding: '0px 5rem',
                fontSize: '28px'
            }} />

        </div>
    )
}
