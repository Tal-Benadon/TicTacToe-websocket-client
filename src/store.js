import { create } from 'zustand'
import io from 'socket.io-client'
export const useBoardStore = create((set, get) => ({
    iterations: 3,
    gameWinner: '',
    resetGameWinner: () => ({ gameWinner: '' }),
    gameEnded: false,
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
    setGameBoard: (newBoard) => ({ gameBoard: newBoard }),
    createBoard: () => {
        let gameBoard = []
        for (let i = 0; i < get().iterations; i++) {
            let buttonRow = []
            for (let j = 0; j < get().iterations; j++) {
                buttonRow.push({
                    symbol: '',
                    animationTrigger: 0,
                    isInactive: false,
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
            if (gameBoard[row][col].isPlayed === true) {
                get().triggerReanimation(row, col)
                return
            }
            gameBoard[row][col].symbol = symbol
            gameBoard[row][col].isPlayed = true
            set({ gameBoard: [...gameBoard] })
        }
    },
    checkBoard: (row, col, symbol) => {
        let gameBoard = get().gameBoard
        let iterations = get().iterations
        let column = []
        let cross1 = []
        let cross2 = []
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
        if (gameBoard[row].every(cell => cell.symbol === gameBoard[row][0].symbol && cell.symbol !== '')) {
            set({ gameWinner: symbol })
            set({ gameEnded: true })
            set({ winningLine: gameBoard[row].map(value => value.location) })
            return
        }
        if (column.every(cell => cell.symbol === column[0].symbol && cell.symbol !== '')) {
            set({ gameWinner: symbol })
            set({ gameEnded: true })
            set({ winningLine: column.map(value => value.location) })
            return
        }
        if (cross1.every(cell => cell.symbol === cross1[0].symbol && cell.symbol !== '')) {
            set({ gameWinner: symbol })
            set({ gameEnded: true })
            set({ winningLine: cross1.map(value => value.location) })
            return
        }
        if (cross2.every(cell => cell.symbol === cross2[0].symbol && cell.symbol !== '')) {
            set({ gameWinner: symbol })
            set({ gameEnded: true })
            set({ winningLine: cross2.map(value => value.location) })
            return
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
    turn: false,
    setTurn: () => set(state => ({ turn: !state.turn }))
}))

export const useSocketStore = create((set, get) => ({
    socket: io('http://localhost:3000')
}))