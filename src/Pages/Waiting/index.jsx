import React, { useEffect, useState } from 'react'
import styles from './style.module.scss';

import WhiteWarpperBox from '../../componnents/WhiteWrapperBox'
import Loading from '../../componnents/Loading'
import { useSocketStore } from '../../store';


export default function Waiting() {
    const [newCod, setNewCod] = useState()

    const socket = useSocketStore((state) => state.socket)


    useEffect(() => {
        socket.emit('create-game')
        socket.on('create-game', ({ id }) => {
            console.log(id);
        })
    }, [])
    // socket.on("create-game", (roomNumber) => {

    // })

    useEffect(() => {
        const randomCod = () => {
            setNewCod(Math.floor(100000 + Math.random() * 900000));
        }
        // לדוגמה:
        console.log(randomCod());
    }, [])
    return (
        <div className={styles.WaitingPage}>

            <WhiteWarpperBox title='your code' style={{ width: '305px', height: '100px' }}>
                <div className={styles.cod}>
                    {newCod}
                </div>
            </WhiteWarpperBox>
            <Loading />

            <h2>WAITING FOR OPPONET</h2>

        </div>
    )
}
