import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import WhiteWrapperBox from '../../componnents/WhiteWrapperBox'
import Title from '../../componnents/Title'
import Button from '../../componnents/Button'
import SymbolButton from '../../componnents/SymbolButton'
import { useLocation, useNavigate } from 'react-router-dom'
import { useBoardStore, useSocketStore, useTurnStore } from '../../store'
export default function ChoosePlayerPage() {
    const socket = useSocketStore((state) => state.socket)
    // const setGameBoard = useBoardStore((state) => state.setGameBoard)
    const { setGameBoard, gameBoard } = useBoardStore()
    const setUserTurn = useTurnStore((state) => state.setUserTurn)
    const setMySymbol = useTurnStore((state) => state.setMySymbol)
    const [isWaiting, setIsWaiting] = useState(false)
    const navigate = useNavigate()

    const [chosen, setChosen] = useState('')
    const [showSymbol, setShowSymbol] = useState('')


    useEffect(() => {
        socket.on("create-board", (data) => {
            const newGameBoard = data.gameBoard
            console.log(newGameBoard);
            let initialTurn = data.initialTurn
            setUserTurn(initialTurn)
            setGameBoard(newGameBoard)

        })
        socket.on('player2IsReady', (data) => {
            console.log("Hi, player2 said he's ready");
            console.log(data.success);
            if (gameBoard.length) {
                navigate('/GameBoard')
            }
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
        setMySymbol(chosen)
        setIsWaiting(!isWaiting)
    }


    return (
        <div className={styles.choosePlayerContainer}>

            <div className={styles.pageTitle}>
                <Title title={isWaiting ? 'Waiting for P2' : 'CHOOSE SIDE'} />
            </div>

            <div className={styles.content}>
                <WhiteWrapperBox style={
                    {
                        padding: '16px',
                        display: 'flex',
                        gap: '18px',
                        pointerEvents: isWaiting ? 'none' : 'auto'
                    }
                }>
                    <SymbolButton
                        symbol={"O"}
                        onClick={() => onChoiceClickHandle("O")}
                        className={`${getClassName("O")} ${isWaiting ? styles.waiting : ""}`} //class name that can also identify if the button is chosen and create an animation. if choice is complete, waiting prevents pointer events.
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
                    pointerEvents: isWaiting ? 'none' : 'auto'
                }

            } />

        </div>

    )
}




