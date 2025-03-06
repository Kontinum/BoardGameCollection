<script setup>
    defineProps({
        text: {
            type: String,
            default: 'Welcome to Board Game Collection app :)'
        }
    })
</script>

<template>
    <div class="flex mb-6">
        <p class="text-xl md:text-2xl homeText">
            {{ text }}
        </p>
    </div>
</template>