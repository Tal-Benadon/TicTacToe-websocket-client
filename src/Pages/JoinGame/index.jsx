import React from 'react'
import styles from './style.module.scss';
import ButtonBack from '../../componnents/ButtonBack'
import InputCod from '../../componnents/inputCod'
import Button from '../../componnents/Button';

export default function JoinGame() {
    return (
        <div className={styles.JoinGame}>
            <ButtonBack />
            <h2>JOIN TO A GAME</h2>

            <InputCod />
            <Button text='JOIN'/>

<div className={styles.OR}>
    <hr />
    <h2>OR</h2>
    <hr />
</div>

<Button text='CREATE A GAME'/>

        </div>
    )
}
