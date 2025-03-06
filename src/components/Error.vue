<script setup>
    defineProps({
        message: {
            type: String,
            default: 'There was an error. Please try again.',
            required: false,
        }
    })
</script>

<template>
    <p class="text-red-400">
        {{ message }}
    </p>
</template>