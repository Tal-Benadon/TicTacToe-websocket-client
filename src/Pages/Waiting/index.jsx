import React, { useEffect, useState } from 'react'
import styles from './style.module.scss';

import WhiteWarpperBox from '../../componnents/WhiteWrapperBox'
import Loading from '../../componnents/Loading'
import { useSocketStore } from '../../store';
import { connect } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';

export default function Waiting() {
    const socket = useSocketStore((state) => state.socket)
    const [gameCode, setGameCode] = useState('')//loading comp

    const navigate = useNavigate()

    useEffect(() => {

        const userName = localStorage.getItem('ticTacToeUserName')
        const imageIndex = parseInt(localStorage.getItem('ticTacToeImgIndex'), 10)

        if (socket && socket.connected) {
            socket.emit('create-game', { userId: socket.id, userName, imageIndex })

        } else {
            socket.on(connect, () => {
                socket.emit('create-game', { userId: socket.id, userName })
            })
        }

        socket.on("game-code", (data) => {
            console.log(data);
            setGameCode(data.gameCode)
        })

        socket.on("gamejoin-alert", (data) => {
            console.log(data);
        })

        socket.on("join-data", (data) => {
            console.log(data.success, data.members);
            if (data.success) {
                console.log("ROOM ID", data.roomId);
                navigate('/ChoosePlayer')
            }
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
