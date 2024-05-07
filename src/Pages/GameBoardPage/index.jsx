import React, { useState } from 'react'
import styles from './styles.module.scss'
import WhiteWrapperBox from '../../componnents/WhiteWrapperBox'
import SymbolButton from '../../componnents/SymbolButton'
export default function GameBoardPage() {
    const [turn, setTurn] = useState(false)

    let buttonId = 0
    let iterations = 3
    let mappedButtons = []
    for (let i = 0; i < iterations; i++) {
        let buttonRow = []
        for (let j = 0; j < iterations; j++) {

            buttonRow.push({
                location: [i, j],
            })
        }
        mappedButtons.push(buttonRow)
    }
    console.log(mappedButtons);
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
                {mappedButtons.map(row => {
                    return <div key={buttonId} className={styles.rowDiv}>
                        {row.map(cell => {
                            buttonId++
                            return (
                                <SymbolButton key={buttonId} id={buttonId} isGameBoard={true} location={cell.location} turn={turn} setTurn={setTurn} />
                            )
                        })}
                    </div>
                })}
            </WhiteWrapperBox>
        </div>
    )
}
