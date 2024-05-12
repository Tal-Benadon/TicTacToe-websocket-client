import React, { useEffect, useState } from 'react'
import styles from './style.module.scss'
import Loading from '../../componnents/Loading'
import { useSocketStore } from '../../store'
export default function PendingGamePage() {
    const socket = useSocketStore((state) => state.socket)

    useEffect(() => {
        socket.on("sides-chosen", (data) => {
            if (data.complete) {
                //statelogic?

            }
        })

    }, [socket])

    return (

        <div className={styles.pendingContainer}>
            <Loading />
            <div className={styles.titles}>
                <h2>OPPONENT IS CHOOSING SIDES</h2>
                <h2>WAITING...</h2>
            </div>
        </div>
    )
}




