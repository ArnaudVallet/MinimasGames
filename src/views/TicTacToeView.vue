<script setup lang="ts">
import { ref, computed } from 'vue'
import { 
    getVictoryCombination,
    isVictory,
    isDraw,
    getWinner,
    minimax
} from '../utils/tictactoe'

const board = ref([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
])
//const flatBoard = computed(() => board.value.flat())
const player = ref(1)

const play = (row: number, col: number) => {
    if(canPlay(row, col)){
        board.value[row][col] = player.value
        if(!isVictory(board.value)){
            player.value = -player.value
            autoPlay()
        } 
    }
}

const autoPlay = () => {
    let bestScore: number = player.value === 1 ? Infinity : -Infinity
    let bestPlay: {row: number, col: number}
    let depth: number = Infinity

    for(let row = 0; row < 3; row++) {
        for(let col = 0; col < 3; col++){
            if(canPlay(row, col)){
                let boardCopy = [...board.value]
                boardCopy[row][col] = player.value
                const score: number = minimax(boardCopy, true, depth)
                boardCopy[row][col] = 0
                if(player.value === -1 && score <= bestScore){
                    if(score === bestScore && ...)
                    bestScore = score
                    bestPlay = {row, col}
                }
            }
        }
    }

    console.log(bestPlay)
    // Play on the best row and col possibly found
    board.value[bestPlay.row][bestPlay.col] = player.value

}



const canPlay = (row: number, col: number): boolean => {
    return board.value[row][col] === 0 && !isVictory(board.value)
}

const isMiddleRow = (row: number): boolean => {
    return row === 1
}

const isMiddleCol = (col: number): boolean => {
    return col === 1
}

const isWinningCell = (row: number, col: number): boolean => {
    const cellFlatNumber: number = row * 3 + col;
    return  getVictoryCombination(board.value).includes(cellFlatNumber)
}


</script>

<template>
  <main>
    <h1>Tic Tac Toe</h1>
    <section>
        <div v-for="row, rowIndex in board" 
            :key="rowIndex" class="row" 
            :class="{ middleRow: isMiddleRow(rowIndex)}"
        >
            <div v-for="col, colIndex in row" 
                :key="colIndex" class="col" 
                :class="{ 
                    middleCol: isMiddleCol(colIndex), 
                    playable: canPlay(rowIndex, colIndex),
                    winningCell: isWinningCell(rowIndex, colIndex)
                }"
                @click="() => play(rowIndex, colIndex)"
            >
                <span v-if="board[rowIndex][colIndex] === 1">X</span>
                <span v-else-if="board[rowIndex][colIndex] === -1">O</span>
                <span v-else></span>
            </div>
        </div>
    </section>
    <p v-if="!isVictory(board)">Player {{player === 1 ? 'X' : 'O'}} it's your turn to play.</p>
    <p v-else>Player {{player === 1 ? 'X' : 'O'}} won the game !</p>
  </main>
</template>

<style scoped>
main {
    font-family:cursive;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    height: 100vh;
}
section {
    font-size: 3em;
}
.row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: center;
    min-height: 100px;
    width: 300px;
}
.middleRow {
    border-top: 2px solid grey;
    border-bottom: 2px solid grey;
}
.middleCol {
    border-left: 2px solid grey;
    border-right: 2px solid grey;
}

.col {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 100px;
    width: 100px;
}

.col.playable {
    cursor: pointer;
}

.winningCell {
    color: lightgreen;
}
</style>
