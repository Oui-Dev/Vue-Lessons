<script setup>
    import { RouterLink } from 'vue-router';
    import { ShoppingCartIcon, Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline';
    import { ref } from 'vue';

    const isReduced = ref(true);
    const openSideBar = () => {
        isReduced.value = !isReduced.value;
    };
</script>

<template>
    <header>
        <!-- Laptop -->
        <nav class="hidden lg:flex">
            <div class="logo-side">
                <RouterLink to="/">
                    <img alt="Vue logo" src="@/assets/logo.svg" width="45" height="45" />
                </RouterLink>
            </div>

            <div class="menu-side">
                <RouterLink to="/">Produits</RouterLink>
                <RouterLink to="/categories">Catégorie</RouterLink>
            </div>

            <div class="button-side">
                <RouterLink to="/cart">
                    <ShoppingCartIcon class="w-6 h-6" />
                </RouterLink>
            </div>
        </nav>

        <!-- Tablet and mobile -->
        <nav class="flex lg:hidden">
            <div class="logo-side">
                <RouterLink to="/">
                    <img alt="Vue logo" src="@/assets/logo.svg" width="35" height="35" />
                </RouterLink>
            </div>

            <div class="button-side">
                <Bars3Icon v-if="isReduced" class="w-6 h-6" @click="openSideBar" />
                <XMarkIcon v-else class="w-6 h-6" @click="openSideBar" />
            </div>

            <div class="absolute top-16 -mt-px right-0 z-10 w-screen max-w-lg">
                <div id="sidebar" class="overflow-hidden shadow-lg rounded-b-lg border-t border-gray-300" :class="{'reduced' : isReduced}">
                    <div class="relative grid gap-2 px-5 py-5 text-sm md:text-base">
                        <RouterLink to="/">Tous les produits</RouterLink>
                        <RouterLink to="/categories">Catégorie</RouterLink>
                        <RouterLink to="/cart">Mon panier</RouterLink>
                    </div>
                </div>
            </div>
        </nav>
    </header>
</template>

<style lang="scss" scoped>
header {
    @apply sticky top-0 w-full z-10 bg-white text-black;

    nav {
        @apply justify-between items-center max-w-7xl h-16 mx-auto px-4 md:px-10;

        a {
            @apply text-gray-600;

            &.router-link-exact-active {
                @apply text-green-600;
            }
        }
    
        .logo-side {
            @screen lg {
                width: 50px;
            }
        }
    
        .menu-side {
            @apply flex items-center gap-6 justify-center;
        }
    
        .button-side {
            @apply flex items-center gap-3 md:gap-6 justify-end;
            @screen lg {
                width: 50px;
            }
        }

        #sidebar {
            @apply bg-white opacity-100;
            pointer-events: all;
            transition: opacity 400ms ease 0ms;

            &.reduced {
                @apply opacity-0 pointer-events-none;
                transition: opacity 400ms ease 0ms;
            }
        }
    }
}
</style>