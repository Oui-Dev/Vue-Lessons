<script setup>
import { RouterView } from 'vue-router';
import NavBar from './components/NavBar.vue';
</script>

<template>
  <NavBar />

  <RouterView class="max-w-6xl mx-auto p-4" />
</template>
