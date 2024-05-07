import React, { useState } from 'react'
import styles from './styles.module.scss'
import SymbolButton from '../../componnents/SymbolButton'
import WhiteWrapperBox from '../../componnents/WhiteWrapperBox'
import Title from '../../componnents/Title'

export default function ChoosePlayerPage() {
    const [chosen, setChosen] = useState(null)
    const [isClicked, setIsClicked] = useState(false)

    return (
        <div className={styles.choosePlayerContainer}>
            <div className={styles.content}>
                <Title title={'CHOOSE SIDE'} />
                <WhiteWrapperBox style={
                    { padding: '16px', display: 'flex', gap: '18px' }
                }>
                    <SymbolButton symbol={"O"} chosen={chosen} setChosen={setChosen} isClicked={isClicked} setIsClicked={setIsClicked} id={"O"} />
                    <SymbolButton symbol={"X"} chosen={chosen} setChosen={setChosen} isClicked={isClicked} setIsClicked={setIsClicked} id={"X"} />
                </WhiteWrapperBox>
            </div>
        </div>
    )
}
