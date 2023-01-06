<script setup>
import { ref, onMounted } from 'vue';

const grid = ref([]);
const score = ref(0);

const cardColor = (card) => {
    return card === 0 ? '' : `background-color: hsl(${Math.log2(card) * 30}, 100%, 50%)`;
};

const updateScore = () => {
    score.value = grid.value.flat().reduce((acc, curr) => acc + curr, 0);
};

onMounted(async () => {
    setupGrid();

    window.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'ArrowUp':
                moveUp();
                break;
            case 'ArrowDown':
                moveDown();
                break;
            case 'ArrowLeft':
                moveLeft();
                break;
            case 'ArrowRight':
                moveRight();
                break;
        }
        if(e.key.includes('Arrow')) {
            addRandomValue();
            updateScore();
        }
    });
});

function setupGrid() {
    grid.value = Array(4).fill(0).map(() => Array(4).fill(0));
    addRandomValue();
}

function getRandomAvailablePosition() {
    const availablePositions = [];
    for (let i = 0; i < grid.value.length; i++) {
        for (let j = 0; j < grid.value.length; j++) {
            if (grid.value[i][j] === 0) {
                availablePositions.push({ x: i, y: j });
            }
        }
    }
    if (availablePositions.length === 0) {
        return null;
    }
    const randomIndex = Math.floor(Math.random() * availablePositions.length);
    return availablePositions[randomIndex];
}

function addRandomValue() {
    for(let i = 1; i <= 2; i++) {
        const pos = getRandomAvailablePosition();
        if(!pos) return;
        grid.value[pos.x][pos.y] = i*2;
    }
}

function moveUp() {
    for (let i = 0; i < grid.value.length; i++) {
        for (let j = 0; j < grid.value.length; j++) {
            if (grid.value[i][j] === 0) continue;
            for (let k = 0; k < i; k++) {
                if (grid.value[k][j] === 0) {
                    grid.value[k][j] = grid.value[i][j];
                    grid.value[i][j] = 0;
                    break;
                } else if (grid.value[k][j] === grid.value[i][j]) {
                    grid.value[k][j] *= 2;
                    grid.value[i][j] = 0;
                    break;
                }
            }
        }
    }
}

function moveDown() {
    for (let i = (grid.value.length - 1); i >= 0; i--) {
        for (let j = 0; j < grid.value.length; j++) {
            if (grid.value[i][j] === 0) continue;
            for (let k = (grid.value.length - 1); k > i; k--) {
                if (grid.value[k][j] === 0) {
                    grid.value[k][j] = grid.value[i][j];
                    grid.value[i][j] = 0;
                    break;
                } else if (grid.value[k][j] === grid.value[i][j]) {
                    grid.value[k][j] *= 2;
                    grid.value[i][j] = 0;
                    break;
                }
            }
        }
    }
}

function moveLeft() {
    for (let i = 0; i < grid.value.length; i++) {
        for (let j = 0; j < grid.value.length; j++) {
            if (grid.value[i][j] === 0) continue;
            for (let k = 0; k < j; k++) {
                if (grid.value[i][k] === 0) {
                    grid.value[i][k] = grid.value[i][j];
                    grid.value[i][j] = 0;
                    break;
                } else if (grid.value[i][k] === grid.value[i][j]) {
                    grid.value[i][k] *= 2;
                    grid.value[i][j] = 0;
                    break;
                }
            }
        }
    }
}

function moveRight() {
    for (let i = 0; i < grid.value.length; i++) {
        for (let j = (grid.value.length - 1); j >= 0; j--) {
            if (grid.value[i][j] === 0) continue;
            for (let k = (grid.value.length - 1); k > j; k--) {
                if (grid.value[i][k] === 0) {
                    grid.value[i][k] = grid.value[i][j];
                    grid.value[i][j] = 0;
                    break;
                } else if (grid.value[i][k] === grid.value[i][j]) {
                    grid.value[i][k] *= 2;
                    grid.value[i][j] = 0;
                    break;
                }
            }
        }
    }
}

function restart() {
    setupGrid();
}
</script>

<template>
    <header class="flex items-center justify-center">
        <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="80" height="80" />
    </header>

    <main class="flex flex-col items-center justify-center mt-12">
        <section class="grid grid-cols-4 gap-4">
            <template v-for="row in grid">
                <template v-for="(card, index) in row" :key="index">
                    <div class="card" :style="cardColor(card)">
                        {{ card !== 0 ? card : '' }}
                    </div>
                </template>
            </template>
        </section>
        <div class="flex gap-4 mt-8">
            <button @click="restart" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Restart
            </button>
            <div class="bg-blue-500 text-white font-bold py-2 px-4 rounded">
                {{ score }}
            </div>
        </div>
    </main>
</template>

<style scoped>
.card {
    @apply bg-gray-200 text-black text-xl flex justify-center items-center h-24 w-24 rounded-lg;
}
</style>