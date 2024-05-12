import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import WhiteWrapperBox from '../../componnents/WhiteWrapperBox'
import Title from '../../componnents/Title'
import Button from '../../componnents/Button'
import SymbolButton from '../../componnents/SymbolButton'
import { useLocation, useNavigate } from 'react-router-dom'
import { useBoardStore, useSocketStore } from '../../store'
export default function ChoosePlayerPage() {
    const socket = useSocketStore((state) => state.socket)
    const setGameBoard = useBoardStore((state) => state.setGameBoard)
    const navigate = useNavigate()

    const [chosen, setChosen] = useState('')
    const [showSymbol, setShowSymbol] = useState('')


    useEffect(() => {
        socket.on("create-board", (data) => {
            const newGameBoard = data.gameBoard
            console.log(newGameBoard);
            setGameBoard(newGameBoard)
        })
    }, [socket])

    const onChoiceClickHandle = (symbol) => {
        setChosen(symbol)
        socket.emit("symbol-choice", symbol)
    }

    const getClassName = (symbol) => {
        const isActive = chosen === symbol ? styles.active : ''
        return `${styles.symbol} ${isActive}`
    }

    const handleLetsPlayClick = (chosen) => {
        console.log(chosen);
        socket.emit("sides-chosen", { complete: true, chosenSymbol: chosen })

        navigate('/GameBoard')


    }


    return (
        <div className={styles.choosePlayerContainer}>

            <div className={styles.pageTitle}>
                <Title title={'CHOOSE SIDE'} />
            </div>

            <div className={styles.content}>
                <WhiteWrapperBox style={
                    { padding: '16px', display: 'flex', gap: '18px' }
                }>
                    <SymbolButton
                        symbol={"O"}
                        onClick={() => onChoiceClickHandle("O")}
                        className={getClassName("O")}
                        isInactive={chosen && chosen !== "O"}
                    />
                    <SymbolButton
                        symbol={"X"}
                        onClick={() => onChoiceClickHandle("X")}
                        className={getClassName("X")}
                        isInactive={chosen && chosen !== "X"}


                    />
                </WhiteWrapperBox>
            </div>


            <Button onClick={() => handleLetsPlayClick(chosen)} text={'LETS PLAY'} style={
                {
                    height: '80px',
                    width: 'fit-content',
                    fontSize: '28px',
                    padding: '0 2rem 0 2rem',
                    opacity: !chosen ? 0 : 1,
                    pointerEvents: !chosen ? 'none' : ''
                }

            } />

        </div>

    )
}




