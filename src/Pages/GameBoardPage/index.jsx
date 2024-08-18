import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import WhiteWrapperBox from '../../componnents/WhiteWrapperBox'
import { useBoardStore, useSocketStore, useTurnStore } from '../../store'
import Button from '../../componnents/Button'
import SymbolButton from '../../componnents/SymbolButton'
import { useNavigate } from 'react-router-dom'
import BoardHeader from '../../componnents/boardHeader'
import Modal from '../../componnents/Modal'
export default function GameBoardPage() {

    const [isWaiting, setIsWaiting] = useState(false)
    const { setMySymbol, userTurn, setUserTurn, mySymbol, setUserInfo, setOpponentInfo } = useTurnStore()

    const { gameBoard, gameEnded, setGameEnded, updateSymbol, setGameWinner, setGameBoard } = useBoardStore()

    const navigate = useNavigate()
    const socket = useSocketStore((state) => state.socket)
    const [showModal, setShowModal] = useState(false)
    const [isUserLeft, setIsUserLeft] = useState(false)
    const openModal = () => {
        setShowModal(true)
    }
    const closeModal = () => {
        setShowModal(false)
    }
    console.log(gameBoard);

    useEffect(() => {
        if (gameBoard.length === 0) {
            console.log("trying to recover");
            let userId = localStorage.ticTacToeId
            let roomId = localStorage.ticTacToeRoomId
            socket.emit('recollect-user-info', { roomId, userId })
        }
        socket.on('refresh-user-info', (data) => {
            let userInfo = data.userInfo
            console.log(data.userInfo);
            setUserInfo(userInfo)
            setOpponentInfo(data.opponentInfo)
            setGameBoard(data.gameBoard)
            setMySymbol(userInfo.symbol)
            console.log(data.currentTurn);
            setUserTurn(data.currentTurn)

            socket.id = userInfo.userId
            socket.roomCode = localStorage.getItem('ticTacToeRoomId')
            console.log("socketcode", socket.roomCode);

        })
    }, [])


    useEffect(() => {
        socket.on("user-backed", (data) => {
            console.log(data.alert);
            setIsUserLeft(true)
            openModal()
        })

        socket.on("game-move", (data) => {
            let newGameBoard = data.gameBoard
            let newTurn = data.newTurn
            setGameBoard(newGameBoard)
            setUserTurn(newTurn)
        })

        socket.on("game-end", (data) => {
            setGameEnded(data.gameEnded)
            setGameWinner(data.gameWinner)
            let thisUser = data.roomUsers.find(user => user.userId === socket.id)
            let opponentUser = data.roomUsers.find(user => user.userId !== socket.id)
            setOpponentInfo(opponentUser)
            setUserInfo(thisUser)
            console.log(data);
            if (data.gameBoard) {
                setGameBoard(data.gameBoard)
            }

        })

        socket.on("illegal-move", (data) => {
            if (data.illegal) {
                console.log(data.alert);
            }
        })

        socket.on("waiting-replay", (data) => {
            console.log(data.alert);

        })

        socket.on("playing-again", (data) => {
            console.log("hi", data.gameBoard);
            setGameBoard(data.gameBoard)
            setGameEnded(data.gameEnded)
            setIsWaiting(false)
            setUserTurn(data.currentTurn)
        })

    }, [socket])

    const onPlayAgainClick = () => {
        // setTurn(false)
        socket.emit("play-again")
        setIsWaiting(true)
    }

    const onBackClick = () => {
        socket.emit("backing-user")
        navigate('/JoinGame')
    }

    const handleOnButtonClick = (location) => {
        if (gameEnded) {
            console.log("gameENDED?");
            return
        }
        if (userTurn === socket.id) {
            console.log(userTurn);
            console.log(socket.id);
            console.log(mySymbol);
            let update = updateSymbol(location[0], location[1], mySymbol) // adds "isPlayed:true"
            console.log(update);
            console.log(gameBoard);
            socket.emit("game-move", { location, mySymbol })
        } else {
            console.log("Id", socket.id);
            console.log("trurn", userTurn);
            console.log("WrongId??");
            return
        }


    }
    const modalUserLeftHtml = () => {
        return (
            <div className={styles.modalContentContainer}>
                <h2>OPPONENT LEFT</h2>
                <p>press to leave to menu</p>
                <div className={styles.modalButtons}>
                    <Button text='CONFIRM' onClick={onBackClick} style={{
                        borderRadius: '7px'
                    }} />
                </div>
            </div>
        )
    }
    const modalHtmlContent = () => {
        return (
            <div className={styles.modalContentContainer}>
                <h2>QUIT GAME?</h2>
                <p>are you sure?</p>
                <div className={styles.modalButtons}>
                    <Button text='YES' onClick={onBackClick} style={{
                        borderRadius: '7px'
                    }} />
                    <Button text='NO' onClick={closeModal} style={{
                        borderRadius: '7px'
                    }} />
                </div>
            </div>
        )
    }

    const getClassName = (symbol) => {
        const isActive = symbol ? styles.xActive : ''
        return `${styles.symbol} ${isActive}`
    }


    return (


        <div className={styles.boardContainer}>
            <Modal show={showModal} onClose={closeModal} >
                {isUserLeft ? modalUserLeftHtml() : modalHtmlContent()}
            </Modal>
            <div className={styles.headerContainer}>
                <BoardHeader />
            </div>
            <div className={styles.screenCntr}>
                <div style={{ width: '100%' }}>
                    <WhiteWrapperBox style={
                        {
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            padding: '16px',
                            gap: '5px',
                        }
                    }>
                        {gameBoard.map((row, rowIndex) => {
                            return <div key={rowIndex} className={styles.rowDiv}>
                                {row.map((cell, columnIndex) => {
                                    let location = [rowIndex, columnIndex]
                                    return (
                                        <SymbolButton key={columnIndex}
                                            symbol={cell.symbol}
                                            onClick={() => handleOnButtonClick(location)}
                                            isInactive={cell.isInactive}
                                            className={getClassName(cell.symbol)}
                                        />
                                    )
                                })}
                            </div>
                        })}
                    </WhiteWrapperBox>
                </div>
            </div>
            {
                gameEnded ?



                    <div className={styles.endBtns}>
                        {!isWaiting ?
                            <Button text={'PLAY AGAIN'} onClick={onPlayAgainClick} style={{
                                height: '60px',
                                width: '250px',
                                fontSize: '28px',
                            }} />

                            :
                            <Button text={'Waiting...'} style={{
                                height: '60px',
                                width: '250px',
                                fontSize: '28px',
                            }} />}
                        <Button text={'BACK'} onClick={onBackClick} style={{
                            height: '60px',
                            width: '250px',
                            fontSize: '28px',
                            whiteSpace: 'nowrap',
                            textAlign: 'center',
                            overflow: 'hidden'

                        }} />
                    </div>
                    :
                    <div className={styles.btn}>
                        <Button text={'BACK'} onClick={openModal} style={{
                            height: '85px',
                            width: 'fit-content',
                            padding: '0px 5rem',
                            fontSize: '28px',
                        }} />
                    </div>

            }

        </div>

    )
}
