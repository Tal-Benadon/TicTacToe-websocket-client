import React, { useEffect, useState } from 'react'
import styles from './style.module.scss';
import ButtonBack from '../../componnents/ButtonBack'
import InputCode from '../../componnents/inputCode'
import Button from '../../componnents/Button';
import { useNavigate } from 'react-router-dom';
import { useSocketStore } from '../../store';

export default function JoinGame() {
    const socket = useSocketStore((state) => state.socket)
    const navigate = useNavigate()
    const [gameCode, setGameCode] = useState('')


    useEffect(() => {
        socket.on("join-data", (data) => {
            if (data.success) {
                console.log("you good", data.members);
                navigate('/PendingGame')
            } else {
                console.log("failed", data.alert);
            }
        })

        return () => {
            socket.off("join-data")
        }
    }, [socket, navigate])


    const onJoinClick = (e) => {
        e.preventDefault()
        console.log(gameCode);
        socket.emit("join-game", { userId: socket.id, gameCode: gameCode })
    }

    const onCreateClick = () => {
        navigate('/Waiting')
    }

    return (
        <div className={styles.JoinGame}>
            <ButtonBack />
            <div className={styles.content}>
                <h2>JOIN TO A GAME</h2>
                <form style={{ width: '100%' }} onSubmit={onJoinClick}>
                    <InputCode value={gameCode} onChange={(e) => setGameCode(e.target.value)} placeholder={'ENTER GAME CODE'} maxlength={'6'} />
                </form>
                <Button text='JOIN' style={{ width: '125px', height: '50px' }} onClick={onJoinClick} />

                <div className={styles.divider}>
                    <hr />
                    <h2>OR</h2>
                    <hr />
                </div>

                <Button text='CREATE A GAME' onClick={onCreateClick} />
            </div>
        </div>
    )
}
