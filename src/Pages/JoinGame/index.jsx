import React, { useEffect, useState } from 'react'
import styles from './style.module.scss';
import ButtonBack from '../../componnents/ButtonBack'
import InputCode from '../../componnents/inputCode'
import Button from '../../componnents/Button';
import { useNavigate } from 'react-router-dom';
import { useBoardStore, useSocketStore, useTurnStore } from '../../store';

export default function JoinGame() {
    const socket = useSocketStore((state) => state.socket)
    const { setUserInfo, setMySymbol, setUserTurn, setOpponentInfo } = useTurnStore()
    const { resetGame, resetGameWinner, setGameBoard } = useBoardStore()
    const navigate = useNavigate()
    const [gameCode, setGameCode] = useState('')

    const resetUser = () => {
        socket.emit('clear-connection')
        setUserInfo(null), setMySymbol(null), setUserTurn(null), setOpponentInfo(null)
        resetGame(), resetGameWinner(), setGameBoard([]), localStorage.removeItem('ticTacToeId'), localStorage.removeItem('ticTacToeRoomId')
        return
    }


    useEffect(() => {

        resetUser()
        socket.on("join-data", (data) => {
            if (data.success) {
                console.log("you good", data.members);
                localStorage.ticTacToeId = socket.id
                localStorage.ticTacToeRoomId = data.roomId
                navigate('/PendingGame')
            } else {
                console.log("failed", data.alert);
            }
        })
        socket.on("incorrect-code", (data) => {
            console.log(data.alert);
        })

        return () => {

            socket.off("join-data")
            socket.off("incorrect-code")
        }
    }, [socket, navigate])


    const onJoinClick = (e) => {
        e.preventDefault()
        const userName = localStorage.getItem('ticTacToeUserName')
        const imageIndex = parseInt(localStorage.getItem('ticTacToeImgIndex'), 10)
        console.log(gameCode);
        socket.emit("join-game", { userId: socket.id, gameCode: gameCode, userName, imageIndex })
    }

    const onCreateClick = () => {

        navigate('/Waiting')
    }

    return (
        <div className={styles.JoinGame}>
            {/* <div className={styles.content}> */}
            <form className={styles.form} onSubmit={onJoinClick}>
                <h2>JOIN TO A GAME</h2>
                <InputCode value={gameCode} onChange={(e) => setGameCode(e.target.value)} placeholder={'ENTER GAME CODE'} maxlength={'6'} />
            </form>
            <div className={styles.buttonsContainer}>
                <Button text='JOIN' style={{ width: '125px', height: '50px' }} onClick={onJoinClick} />

                <div className={styles.divider}>
                    <hr />
                    <h2>OR</h2>
                    <hr />
                </div>

                <Button text='CREATE A GAME' onClick={onCreateClick} style={{
                    width: '100%'

                }} />
            </div>
            {/* </div> */}
        </div>
    )
}
