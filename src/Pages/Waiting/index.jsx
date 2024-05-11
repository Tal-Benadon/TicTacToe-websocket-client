import React, { useEffect, useState } from 'react'
import styles from './style.module.scss';

import WhiteWarpperBox from '../../componnents/WhiteWrapperBox'
import Loading from '../../componnents/Loading'
import { useSocketStore } from '../../store';
import { connect } from 'socket.io-client';

export default function Waiting() {
    const socket = useSocketStore((state) => state.socket)
    const [gameCode, setGameCode] = useState('')//loading comp


    useEffect(() => {
        if (socket && socket.connected) {
            socket.emit('create-game', { userId: socket.id })

        } else {
            socket.on(connect, () => {
                socket.emit('create-game', { userId: socket.id })
            })
        }

        socket.on("game-code", (data) => {
            console.log(data);
            setGameCode(data.gameCode)
        })

        socket.on("gamejoin-alert", (data) => {
            console.log(data);
        })

        return () => {
            socket.off("game-code")
            socket.off("gamejoin-alert")
        }
    }, [socket])


    return (
        <div className={styles.WaitingPage}>

            <WhiteWarpperBox title='your code' style={{ width: '305px', height: '100px' }}>
                <div className={styles.code}>
                    {gameCode}
                </div>
            </WhiteWarpperBox>
            <Loading />

            <h2>WAITING FOR OPPONENT</h2>

        </div>
    )
}
