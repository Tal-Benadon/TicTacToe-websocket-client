import React, { useState } from 'react'
import styles from './styles.module.scss'
import SymbolButton from '../../componnents/SymbolButton'
import WhiteWrapperBox from '../../componnents/WhiteWrapperBox'
import Title from '../../componnents/Title'
import Button from '../../componnents/Button'
export default function ChoosePlayerPage() {
    const [chosen, setChosen] = useState(null)
    const [isClicked, setIsClicked] = useState(false)

    return (
        <div className={styles.choosePlayerContainer}>
            <div className={styles.content}>
                <div className={styles.pageTitle}>
                    <Title title={'CHOOSE SIDE'} />
                </div>
                <div>
                    <WhiteWrapperBox style={
                        { padding: '16px', display: 'flex', gap: '18px' }
                    }>
                        <SymbolButton symbol={"O"} chosen={chosen} setChosen={setChosen} isClicked={isClicked} setIsClicked={setIsClicked} id={"O"} />
                        <SymbolButton symbol={"X"} chosen={chosen} setChosen={setChosen} isClicked={isClicked} setIsClicked={setIsClicked} id={"X"} />
                    </WhiteWrapperBox>
                </div>

                <Button Navigate={'/GameBoard'} text={'LETS PLAY'} style={
                    {
                        height: '80px',
                        width: 'fit-content',
                        fontSize: '28px',
                        padding: '0 2rem 0 2rem',
                        opacity: !isClicked ? 0 : 1
                    }

                } />
            </div>
        </div>
    )
}
