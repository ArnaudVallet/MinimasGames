const VICTORY_COMBINATIONS: number[][] = [
    [0, 1, 2], // First row
    [3, 4, 5], // Second row
    [6, 7, 8], // Third row
    [0, 3, 6], // First col
    [1, 4, 7], // Second col
    [2, 5, 8], // Third col
    [0, 4, 8], // First diag
    [2, 4, 6], // Second diag
]

const getVictoryCombination = (board: number[][]): number[] => {
    const flatBoard = board.flat()
    for(const vc of VICTORY_COMBINATIONS) {
        if(
            flatBoard[vc[0]] === flatBoard[vc[1]] 
            && flatBoard[vc[0]] === flatBoard[vc[2]] 
            && flatBoard[vc[0]] !== 0
        ) return vc
    }
    return []
}

const isVictory = (board: number[][]): boolean => {
    return getVictoryCombination(board).length !== 0
}

const isDraw = (board: number[][]): boolean => {
    return !isVictory(board) && !board.flat().includes(0)
}

const getWinner = (board: number[][]): number => {
    const victoryCombination: number[] = getVictoryCombination(board)
    const flatBoard = board.flat()
    if(!victoryCombination.length) return 0
    const winner = flatBoard[victoryCombination[0]]
    return winner
}

const minimax = (board: number[][], isMaximizing: boolean, depth: number): number => {
    
    // Check for victory/draw
    if(isVictory(board)) return getWinner(board)

    let bestScore = isMaximizing ? -Infinity : Infinity
    for(let row = 0; row < 3; row++){
        for(let col = 0; col < 3; col++){
            if(board[row][col] === 0){
                board[row][col] = isMaximizing ? 1 : -1
                const score = minimax(board, !isMaximizing, ++depth)
                board[row][col] = 0
                bestScore = isMaximizing ? Math.max(score, bestScore) : Math.min(score, bestScore)
            }
        }
    }

    return bestScore
}

export {
    VICTORY_COMBINATIONS,
    getVictoryCombination,
    isVictory,
    isDraw,
    getWinner,
    minimax
}