import React, { useState } from 'react'

import SymbolButton from '../../componnents/SymbolButton'
import WhiteWrapperBox from '../../componnents/WhiteWrapperBox'

export default function ChoosePlayerPage() {
    const [chosen, setChosen] = useState(null)
    const [isClicked, setIsClicked] = useState(false)

    return (
        <WhiteWrapperBox style={
            { padding: '16px', display: 'flex', gap: '18px' }
        }>
            <SymbolButton symbol={"O"} chosen={chosen} setChosen={setChosen} isClicked={isClicked} setIsClicked={setIsClicked} id={"O"} />
            <SymbolButton symbol={"X"} chosen={chosen} setChosen={setChosen} isClicked={isClicked} setIsClicked={setIsClicked} id={"X"} />
        </WhiteWrapperBox>
    )
}
