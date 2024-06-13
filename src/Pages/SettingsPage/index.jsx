import React, { useEffect, useState } from 'react'
import styles from './style.module.scss'
import InputCode from '../../componnents/inputCode'
import Button from '../../componnents/Button'
import CharRouletteV2 from '../../componnents/CharRouletteV2'
import { images } from '../../data/imageList'
export default function SettingsPage() {

    const [imageIndex, setImageIndex] = useState(0)
    const [userName, setUserName] = useState('')
    const [isAlertShow, setIsAlertShow] = useState(false)
    const [alertMsg, setAlertMsg] = useState('')

    const nameAlert = { invalid: "INVALID NAME", valid: "INFO SAVED!", sameInfo: "INFO ALREADY SAVED", tooLong: "NAME TOO LONG" }

    //The useEffect checks if there's a username saved and puts it in the input field
    useEffect(() => {
        const localUserName = localStorage.getItem('ticTacToeUserName')
        const chosenImageIndex = localStorage.getItem('ticTacToeImgIndex')
        if (localUserName) {
            setUserName(localUserName)
        }
        if (chosenImageIndex) {
            setImageIndex(parseInt(chosenImageIndex, 10))
        }
    }, [window.location])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (localStorage.getItem('ticTacToeUserName') === userName &&
            localStorage.getItem('ticTacToeImgIndex') === imageIndex) {
            setAlertMsg(nameAlert.sameInfo)
            showTempMsg()
            return
        }


        if (userName) {
            if (userName.length > 10) {
                setAlertMsg(nameAlert.tooLong)
                showTempMsg()
                return
            }
            setAlertMsg(nameAlert.valid)
            localStorage.ticTacToeUserName = userName
            localStorage.ticTacToeImgIndex = imageIndex % images.length
            showTempMsg()
            return
        } else {
            setAlertMsg(nameAlert.invalid)
            showTempMsg()
        }
    }
    const handleOnChange = (e) => {
        setUserName(e.target.value)
    }

    const showTempMsg = () => {
        setIsAlertShow(true)
        setTimeout(() => {
            setIsAlertShow(false)
            setAlertMsg('')
        }, 2000);
    }

    //using Usestate to save the value from the input onChange, on submit puts it in the localStorage
    //alerts are shown for 2 seconds after confirmation, depending on the validity of the name
    return (
        <main className={styles.main}>
            <div className={styles.imgEncompass}>
                <img className={styles.appImg} src="620af74ff1676949d91804882a8c5bab.png" alt="" />
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
                <InputCode title={"YOUR NAME"} value={userName} classname={styles.settingsInput} onChange={handleOnChange} />
                {/* <CharRoulette images={images} /> */}
                <CharRouletteV2 images={images} imageIndex={imageIndex} setImageIndex={setImageIndex} />
                <div className={styles.buttonEncompass}>
                    <Button text={"CONFIRM"} type='submit' style={{
                        width: 'fit-content',
                        borderRadius: '8px',
                        padding: '1rem',

                        pointerEvents: isAlertShow ? 'none' : ''
                    }}
                        disabled={isAlertShow}
                    />
                </div>
            </form>
            <h2 className={styles.tempMsg}>{isAlertShow ? alertMsg : ''}</h2>
        </main>
    )
}
