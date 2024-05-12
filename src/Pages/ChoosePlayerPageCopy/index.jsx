import React, { useState } from 'react'
import styles from './styles.module.scss'
import WhiteWrapperBox from '../../componnents/WhiteWrapperBox'
import Title from '../../componnents/Title'
import Button from '../../componnents/Button'
import SymbolButtonCopy from '../../componnents/SymbolButtonCopy'
import { useLocation } from 'react-router-dom'
import { useSocketStore } from '../../store'
export default function ChoosePlayerPageCopy() {
    const socket = useSocketStore((state) => state.socket)


    const [chosen, setChosen] = useState('')

    const onChoiceClickHandle = (symbol) => {
        setChosen(symbol)
        socket.emit("symbol-choice", symbol)
    }

    const getClassName = (symbol) => {
        const isActive = chosen === symbol ? styles.active : ''
        return `${styles.symbol} ${isActive}`
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
                    <SymbolButtonCopy
                        symbol={"O"}
                        onClick={() => onChoiceClickHandle("O")}
                        className={getClassName("O")}
                        isInactive={chosen && chosen !== "O"}
                    />
                    <SymbolButtonCopy
                        symbol={"X"}
                        onClick={() => onChoiceClickHandle("X")}
                        className={getClassName("X")}
                        isInactive={chosen && chosen !== "X"}


                    />
                </WhiteWrapperBox>
            </div>


            <Button Navigate={'/GameBoard'} text={'LETS PLAY'} style={
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




