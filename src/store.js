import { create } from 'zustand'

export const useBoardStore = create((set, get) => ({
    iterations: 3,
    gameBoard: [],
    createBoard: () => {
        let gameBoard = []
        for (let i = 0; i < get().iterations; i++) {
            let buttonRow = []
            for (let j = 0; j < get().iterations; j++) {
                buttonRow.push({
                    symbol: '',
                })
            }
            gameBoard.push(buttonRow)
            set({ gameBoard })
        }
    },
    updateSymbol: (row, col, symbol) => {
        let gameBoard = get().gameBoard
        if (gameBoard[row] && gameBoard[row][col]) {
            gameBoard[row][col].symbol = symbol
            set({ gameBoard: [...gameBoard] })
        }
    },

    checkBoard: (row, col) => {
        let gameBoard = get().gameBoard
        console.log(gameBoard[row]);

    }

}))


export const useTurnStore = create((set, get) => ({
    turn: false,
    setTurn: () => set(state => ({ turn: !state.turn }))
}))