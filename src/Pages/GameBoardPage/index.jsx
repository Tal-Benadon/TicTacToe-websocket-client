import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import WhiteWrapperBox from '../../componnents/WhiteWrapperBox'
import SymbolButton from '../../componnents/SymbolButton'
import { useBoardStore } from '../../store'
export default function GameBoardPage() {

    const createGameBoard = useBoardStore((state) => state.createBoard)
    const gameBoard = useBoardStore((state) => state.gameBoard)
    const checkBoard = useBoardStore((state) => state.checkBoard)

    useEffect(() => {
        createGameBoard()
    }, [])


    return (
        <div className={styles.boardContainer}>
            <h2>headerPlaceHolder</h2>
            <WhiteWrapperBox style={
                {
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    padding: '18px',
                    gap: '5px',
                }
            }>
                {gameBoard.map((row, index) => {
                    return <div key={index} className={styles.rowDiv}>
                        {row.map((cell, index) => {
                            return (
                                <SymbolButton 
                                
                                key={index}
                                 isGameBoard={true}
                                 buttonValue={cell.symbol} 
                                location={cell.location} />
                            )
                        })}
                    </div>
                })}
            </WhiteWrapperBox>
        </div>
    )
}
