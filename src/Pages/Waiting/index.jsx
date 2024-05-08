import React from 'react'
import styles from './style.module.scss';

import WhiteWarpperBox from '../../componnents/WhiteWrapperBox'
import Loading from '../../componnents/Loading'


export default function Waiting() {
    return (
        <div className={styles.WaitingPage}>

            <WhiteWarpperBox title='your code' style={{ width: '305px' , height :'100px'  }}/>

            <Loading />

            <h2>WAITING FOR OPPONET</h2>

        </div>
    )
}
