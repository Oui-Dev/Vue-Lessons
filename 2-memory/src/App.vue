<script setup>
import { ref, onMounted } from 'vue';

const cards = ref([]);
const clickedCards = ref([]);
const solvedCards = ref([]);
const timeoutId = ref(null);
const score = ref(0);

onMounted(async () => {
    cards.value = await fetchCards();
    cards.value = shuffleCards(cards.value);
});

const isDisplayed = (card) => {
    return !clickedCards.value.includes(card) && !solvedCards.value.includes(card);
}

async function fetchCards() {
    const response = await fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=8');
    const data = await response.json();
    const cards = [];
    // make pairs
    for (let i = 0; i < data.cards.length; i++) {
        cards.push({ id: `${i}-1`, code: data.cards[i].code, image: data.cards[i].image });
        cards.push({ id: `${i}-2`, code: data.cards[i].code, image: data.cards[i].image });
    }
    return cards;
}

function shuffleCards(cards) {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }

    return cards;
}

function changeState(card) {
    if(clickedCards.value.length === 2) {
        clearTimeout(timeoutId.value);
        clickedCards.value = [];
    }
    clickedCards.value.push(card);
    if(clickedCards.value.length === 2) {
        if(clickedCards.value[0].code === clickedCards.value[1].code) {
            solvedCards.value.push(...clickedCards.value);
            score.value++;
        }
        timeoutId.value = setTimeout(() => {
            clickedCards.value = [];
        }, 1500);
    }
}

async function restart() {
    clickedCards.value = [];
    solvedCards.value = [];
    score.value = 0;
    cards.value = shuffleCards(cards.value);
}
</script>

<template>
    <header class="flex items-center justify-center">
        <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="80" height="80" />
    </header>

    <main class="flex flex-col items-center justify-center mt-12">
        <section class="grid grid-cols-4 gap-4">
            <div v-for="card in cards" :key="card.id" class="relative">
                <img :src="card.image" alt="memory img" :class="['w-24 h-32', {'animation' : isDisplayed(card)}]">
                <div v-show="isDisplayed(card)" @click="changeState(card)"
                    class="w-24 h-32 absolute inset-0 bg-gray-300 rounded-md cursor-pointer animation"
                />
            </div>
        </section>
        <div class="flex gap-4 mt-8">
            <button @click="restart" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Restart
            </button>
            <div class="bg-blue-500 text-white font-bold py-2 px-4 rounded">
                {{ score }}
            </div>
            <h2 v-show="solvedCards.length > 14" class="bg-blue-500 text-white font-bold py-2 px-4 rounded">
                Bien joué !
            </h2>
        </div>
    </main>
</template>

<style scoped>
.animation {
    animation: flip 1s;
}

@keyframes flip {
    0% {
        transform: rotateY(0deg);
    }
    100% {
        transform: rotateY(180deg);
    }
}
</style>