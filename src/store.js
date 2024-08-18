import { create } from 'zustand'
import io from 'socket.io-client'
export const useBoardStore = create((set, get) => ({
    iterations: 3,
    gameWinner: {},
    setGameWinner: (result) => set({ gameWinner: result }),
    resetGameWinner: () => ({ gameWinner: {} }),
    gameEnded: false,
    setGameEnded: (result) => set({ gameEnded: result }),
    resetGame: () => set({ gameEnded: false }),
    gameBoard: [],
    winningLine: [],
    updateEndGameBoard: (row, col) => {
        let gameBoard = get().gameBoard
        if (gameBoard[row] && gameBoard[row][col]) {
            gameBoard[row][col].isInactive = true
            set({ gameBoard: [...gameBoard] })
        }
    },
    setGameBoard: (newBoard) => set({ gameBoard: newBoard }),
    createBoard: () => {
        let gameBoard = []
        for (let i = 0; i < get().iterations; i++) {
            let buttonRow = []
            for (let j = 0; j < get().iterations; j++) {
                buttonRow.push({
                    symbol: '',
                    animationTrigger: 0,
                    isInactive: false,
                    isPlayed: false,
                    location: [i, j]
                })
            }
            gameBoard.push(buttonRow)
            set({ gameBoard })
        }
    },
    updateSymbol: (row, col, symbol) => {


        let gameBoard = get().gameBoard
        if (gameBoard[row] && gameBoard[row][col]) {
            let newBoard = get().updateSymbolFunction(row, col, symbol, gameBoard)
            if (newBoard) {
                set({ gameBoard: newBoard })
            } else {
                return false
            }
        }
    },

    updateSymbolFunction: (row, col, symbol, gameBoard) => {
        if (gameBoard[row][col].isPlayed = false) {
            gameBoard[row][col].symbol = symbol
            gameBoard[row][col].isPlayed = true
            return [...gameBoard]
        } else {
            return false
        }
    },

    checkBoard: (row, col, symbol) => {



        let gameBoard = get().gameBoard
        let iterations = get().iterations

        // function to check board - 

        let checkup = get().checkBoardFunction(gameBoard, iterations, row, col, symbol)
        if (checkup) {
            set({ gameWinner: checkup.gameWinner, gameEnded: checkup.gameEnded, gameBoard: checkup.gameBoard })
        }

    },
    checkBoardFunction: (gameBoard, iterations, row, col, symbol) => {
        let column = []
        let cross1 = []
        let cross2 = []
        let gameRow = gameBoard[row]
        let j = 0
        let k = 0
        for (let i = 0; i < iterations; i++) {
            cross1.push(gameBoard[j][i])
            j++
        }
        for (let i = iterations - 1; i >= 0; i--) {
            cross2.push(gameBoard[k][i])
            k++
        }
        for (let i = 0; i < iterations; i++) {
            column.push(gameBoard[i][col]);
        }
        if (gameRow.every(cell => cell.symbol === gameRow[0].symbol && cell.symbol !== '')) {

            console.log({ gameRow });
            return {

                gameWinner: symbol, gameEnded: true, gameBoard: gameBoard.map(row =>
                    row.map(cell =>
                        !includesSubArray(gameRow.map(value => value.location), cell.location) ?
                            { ...cell, isInactive: true }
                            : cell
                    )
                )
            }
        }
        if (column.every(cell => cell.symbol === column[0].symbol && cell.symbol !== '')) {
            console.log({ column });
            return {
                gameWinner: symbol, gameEnded: true, gameBoard: gameBoard.map(row =>
                    row.map(cell =>
                        !includesSubArray(column.map(value => value.location), cell.location) ?
                            { ...cell, isInactive: true }
                            : cell
                    )
                )
            }
        }
        if (cross1.every(cell => cell.symbol === cross1[0].symbol && cell.symbol !== '')) {
            return {
                gameWinner: symbol, gameEnded: true, gameBoard: gameBoard.map(row =>
                    row.map(cell =>
                        !includesSubArray(cross1.map(value => value.location), cell.location) ?
                            { ...cell, isInactive: true }
                            : cell
                    )
                )
            }
        }
        if (cross2.every(cell => cell.symbol === cross2[0].symbol && cell.symbol !== '')) {
            return {
                gameWinner: symbol, gameEnded: true, gameBoard: gameBoard.map(row =>
                    row.map(cell =>
                        !includesSubArray(cross2.map(value => value.location), cell.location) ?
                            { ...cell, isInactive: true }
                            : cell
                    )
                )
            }
        } else {
            return false
        }
    },
    triggerReanimation: (row, col) => {
        let gameBoard = get().gameBoard
        const newBoard = gameBoard.map((r, rIndex) =>
            r.map((cell, cIndex) => {
                if (rIndex === row && cIndex === col) {

                    return { ...cell, animationTrigger: cell.animationTrigger + 1 };
                }
                return cell;
            })
        );
        set({ gameBoard: newBoard });
    },
}))


export const useTurnStore = create((set, get) => ({
    userTurn: {},
    userInfo: {},
    opponentInfo: {},
    mySymbol: '',
    setUserInfo: (info) => set({ userInfo: info }),
    setMySymbol: (newSymbol) => set({ mySymbol: newSymbol }),
    setUserTurn: (newUser) => set({ userTurn: newUser }),
    setOpponentInfo: (opponentInfo) => set({ opponentInfo })
}))

export const useSocketStore = create((set, get) => ({
    socket: io('http://localhost:3000')
}))
//http://localhost:3000
//https://0422jj7m-3000.euw.devtunnels.ms/

const includesSubArray = (mainArray, subArray) => {
    return mainArray.some(element =>
        Array.isArray(element) &&
        element.length === subArray.length &&
        element.every((value, index) => value === subArray[index])
    );
}

//  gameBoard , iterations, row, col , symbol
// false
// {gameWinner : 'x' , bameBoard: [], gameEnded: true}

export const useUserStore = create((set, get) => ({}))