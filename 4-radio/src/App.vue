<script setup>
import { RouterLink, RouterView } from 'vue-router';
import StationPlayer from '@/components/StationPlayer.vue';
</script>

<template>
    <header class="h-16 flex items-center gap-8 relative max-w-7xl mx-auto p-security">
        <img alt="Vue logo" class="absolute top-4 md:top-3 h-8 md:h-10" src="@/assets/logo.svg" />

        <nav>
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/favorites">Favorites</RouterLink>
        </nav>
    </header>

    <main class="max-w-6xl mx-auto p-security">
        <RouterView />
    </main>

    <footer class="fixed bottom-0 w-full h-20">
        <StationPlayer class="p-security" />
    </footer>
</template>

<style scoped>
.p-security {
    @apply px-4 sm:px-6 lg:px-8;
}

nav {
    @apply w-full flex items-center justify-center divide-x divide-gray-400;
}

nav a {
    @apply px-5 text-gray-400 cursor-pointer;
}

nav a.router-link-exact-active {
    @apply text-green-500;
}
</style>
