<script setup>
import { useRoute, useRouter } from 'vue-router';
import { useItemsStore } from '@/stores/items';
import { StarIcon } from '@heroicons/vue/20/solid';
import { onMounted, computed, watch, ref } from 'vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import ImageViewer from '../components/ImageViewer.vue';

const router = useRouter();
const params = useRoute().params;
const store = useItemsStore();
const imageViewerSrc = ref('');

onMounted(() => {
    store.fetchItemByID(params.id);
});

const product = computed(() => store.items.product ?? {});
const isLoading = computed(() => store.isLoading ?? false);
const reviewsAverage = computed(() => Math.round(product.value.rating ?? 0));

watch(() => store.error, (error) => {
    if (error) router.push({ name: 'products' });
});

const openImageViewer = (image) => {
    imageViewerSrc.value = image;
};
const closeImageViewer = () => {
    imageViewerSrc.value = '';
};
</script>

<template>
    <main>
        <LoadingSpinner :display="isLoading" />
        <ImageViewer @close="closeImageViewer" :image="imageViewerSrc" />
        <!-- Image gallery -->
        <div class="gallery">
            <div v-if="product.images?.length > 0" @click="openImageViewer(product.images[0])" class="aspect-w-4 aspect-h-5 lg:aspect-w-3 lg:aspect-h-4 imgDiv">
                <img :src="product.images[0]" alt="Product image" />
            </div>
            <div v-if="product.images?.length > 2" class="hidden sm:grid sm:grid-cols-1 sm:gap-y-8">
                <div @click="openImageViewer(product.images[1])" class="aspect-w-3 aspect-h-2 imgDiv">
                    <img :src="product.images[1]" alt="Product image" />
                </div>
                <div @click="openImageViewer(product.images[2])" class="aspect-w-3 aspect-h-2 imgDiv">
                    <img :src="product.images[2]" alt="Product image" />
                </div>
            </div>
            <div v-if="product.images?.length > 3" @click="openImageViewer(product.images[3])" class="aspect-w-3 aspect-h-4 hidden lg:block imgDiv">
                <img :src="product.images[3]" alt="Product image" />
            </div>
        </div>

        <!-- Product info -->
        <div
            class="mx-auto px-4 pt-12 sm:px-6 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8">
            <div class="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                <h1 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{{ product.name }}</h1>
            </div>

            <!-- Options -->
            <div class="mt-4 lg:row-span-3 lg:mt-0">
                <h2 class="sr-only">Product information</h2>
                <p class="text-3xl tracking-tight text-gray-900">${{ product.price }}</p>

                <!-- Reviews -->
                <div class="mt-6">
                    <h3 class="sr-only">Reviews</h3>
                    <div class="flex items-center">
                        <div class="flex items-center">
                            <StarIcon v-for="rating in [0, 1, 2, 3, 4]" :key="rating"
                                :class="[reviewsAverage > rating ? 'text-gray-900' : 'text-gray-200', 'h-5 w-5 flex-shrink-0']"
                                aria-hidden="true" />
                        </div>
                        <p class="sr-only">{{ reviewsAverage }} out of 5 stars</p>
                    </div>
                </div>

                <button @click="addToCart"
                    class="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-green-500 py-3 px-8 text-base font-medium text-white hover:bg-green-400">
                    Ajouter au panier
                </button>
            </div>

            <div class="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pr-8">
                <!-- Description and details -->
                <div>
                    <h2 class="text-xl">{{ product.title }}</h2>
                </div>
                <div class="mt-8">
                    <h3 class="sr-only">Description</h3>

                    <div class="space-y-6">
                        <p class="text-base text-gray-900">{{ product.description }}</p>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<style lang="scss" scoped>
.gallery {
    @apply mx-auto overflow-hidden mt-6 px-6 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-x-8 sm:px-8;

    .imgDiv {
        @apply overflow-hidden rounded-lg cursor-pointer;
    }

    img {
        @apply h-full w-full object-cover object-center;
    }
}
</style>